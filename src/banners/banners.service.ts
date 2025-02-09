import {
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

const banners_limit: number = parseInt(process.env.BANNERS_LIMIT);

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: BannerRepository,
  ) {}

  async createBanner(bannerDto: CreateBannerDto): Promise<Banner> {
    //a banner should be of limited total
    const banners = await this.bannerRepository.count();
    if (banners >= banners_limit) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: ['banners limit exeeded'],
        error: 'Conflict',
      });
    }
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

  async fetchAllBanners(): Promise<{ data: Banner[] }> {
    const banners = await this.bannerRepository.find({
      order: { created_at: 'DESC' },
    });

    return {
      data: banners,
    };
  }

  async updateBanner(id: string, bannerDto: UpdateBannerDto): Promise<Banner> {
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

  async deleteBanner(id: string) {
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
