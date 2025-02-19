import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerRepository } from './repositories/banner.repository';
import { Banner } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';
import { Product } from '../products/entities/product.entity';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { Category } from '../categories/entities/category.entity';
import { CategoryRepository } from '../categories/repositories/Category.repository';
import { StatusEnum } from 'src/enums/status.enum';

const banners_limit: number = parseInt(process.env.BANNERS_LIMIT) || 5;

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: BannerRepository,
    @InjectRepository(Product)
    private readonly productsRepository: ProductRepository,
    @InjectRepository(Category)
    private readonly categoriesRepository: CategoryRepository,
  ) {}

  //validation before creating or updating the banners, check if the redirects exists on the accociated tables
  validateRedirects = async (
    redirectId: string,
    redirectType: RedirectTypeEnum,
  ) => {
    //ensure both fiels are provided before validating
    if (!redirectId || !redirectType) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['redirect fields are missing'],
        error: 'Not Found',
      });
    }
    if (redirectType === RedirectTypeEnum.Category) {
      const category = await this.categoriesRepository.findOne({
        where: { id: redirectId },
      });

      if (!category) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['Invalid redirect id'],
          error: 'Bad Request',
        });
      }
    } else if (redirectType === RedirectTypeEnum.Product) {
      const product = await this.productsRepository.findOne({
        where: { id: redirectId },
      });

      if (!product) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['Invalid redirect id'],
          error: 'Bad Request',
        });
      }
    }
  };

  /* limit the banners updation if the published data is more than 6 */
  limitBannersUpdation = async () => {
    const publishedBanners = await this.bannerRepository.find({
      where: {
        status: StatusEnum.Published,
      },
    });

    if (publishedBanners.length >= banners_limit) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: ['banners limit exeeded'],
        error: 'Conflict',
      });
    }
  };

  async createBanner(bannerDto: CreateBannerDto): Promise<Banner> {
    await this.validateRedirects(
      bannerDto.redirect_id,
      bannerDto.redirect_type,
    );
    //a banner should be of limited total with published status
    await this.limitBannersUpdation();
    try {
      const banner = this.bannerRepository.create({
        title: bannerDto.title,
        description: bannerDto.description,
        redirect_id: bannerDto.redirect_id,
        redirect_type: bannerDto.redirect_type,
      });

      return await this.bannerRepository.save(banner);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating the banner', error],
        error: 'Internal server error',
      });
    }
  }

  async findBannerById(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['banner not found'],
        error: 'Not Found',
      });
    }

    return banner;
  }

  /* banners for admin */
  async fetchAllBanners(): Promise<{ data: Banner[] }> {
    const banners = await this.bannerRepository.find({
      order: { created_at: 'DESC' },
    });

    return {
      data: banners,
    };
  }

  /* fetch all banners for front-end */
  async fetchAllBannersFE(): Promise<{ data: Banner[] }> {
    const banners = await this.bannerRepository.find({
      where: {
        status: StatusEnum.Published,
        is_active: true,
      },
    });

    return {
      data: banners,
    };
  }

  /* banners redirect information for front-end */
  async fetchBannersWithRedirects(): Promise<{ data: Banner[] }> {
    const bannersData = await this.bannerRepository.find();

    const bannersDataRedirects: any[] = [];

    for (const banner of bannersData) {
      let redirects: any = null;

      if (banner.redirect_type === RedirectTypeEnum.Category) {
        const category = await this.categoriesRepository.findOne({
          where: {
            id: banner.redirect_id,
            status: StatusEnum.Published,
            is_active: true,
          },
        });

        redirects = category
          ? { title: category.title, id: category.id }
          : { title: null, id: null };
      } else if (banner.redirect_type === RedirectTypeEnum.Product) {
        const product = await this.productsRepository.findOne({
          where: {
            id: banner.redirect_id,
            status: StatusEnum.Published,
            is_active: true,
          },
        });

        redirects = product
          ? { title: product.title, id: product.id }
          : { title: null, id: null };
      }

      bannersDataRedirects.push({
        title: banner.title,
        id: banner.id,
        redirect_id: banner.redirect_id,
        redirect_type: banner.redirect_type,
        image_url: banner.image_url,
        redirects: redirects,
      });
    }
    return {
      data: bannersDataRedirects,
    };
  }

  async updateBanner(id: string, bannerDto: UpdateBannerDto): Promise<Banner> {
    await this.validateRedirects(
      bannerDto.redirect_id,
      bannerDto.redirect_type,
    );

    await this.limitBannersUpdation(); /* limit the banners with limited piblished data */
    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['banner not found'],
        error: 'Not Found',
      });
    }

    try {
      await this.bannerRepository.update(
        { id },
        {
          title: bannerDto.title,
          description: bannerDto.description,
          redirect_id: bannerDto.redirect_id,
          redirect_type: bannerDto.redirect_type,
        },
      );

      return await this.bannerRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while updating the banner', error],
        error: 'Internal server error',
      });
    }
  }

  async deleteBanner(id: string): Promise<{ id: string; message: string }> {
    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['banner not found'],
        error: 'Not Found',
      });
    }

    try {
      await this.bannerRepository.softDelete(id);
      return { id: `${id}`, message: 'banner has been deleted' };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while updating the banner', error],
        error: 'Internal server error',
      });
    }
  }
}
