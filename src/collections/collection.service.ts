import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Collection } from './entities/collection.entity';
import { CollectionRepository } from './repositories/collection.repository';
import { CollectionRedirect } from './entities/CollectionRedirect.entity';
import { CollectionredirectRepository } from './repositories/collectionRedirect.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { StatusEnum } from 'src/enums/status.enum';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionRedirectDto } from './dto/create-collectionRedirect.dto';
import { CollectionRedirectTypeEnum } from 'src/enums/collectionRedirectType.enum';
import { Category } from 'src/categories/entities/category.entity';
import { CategoryRepository } from '../categories/repositories/Category.repository';
import { Product } from '../products/entities/product.entity';
import { ProductRepository } from '../products/repositories/product.repository';
import { In, ILike } from 'typeorm';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: CollectionRepository,
    @InjectRepository(CollectionRedirect)
    private readonly collectionRedirectRepository: CollectionredirectRepository,
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
  ) {}

  async createCollection(
    collectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    try {
      const collection = this.collectionRepository.create({
        title: collectionDto.title,
        status: collectionDto.status || StatusEnum.Draft,
        image_url: collectionDto.image_url,
      });

      return await this.collectionRepository.save(collection);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating colleciton', error],
        error: 'Internal server Error',
      });
    }
  }

  async findCollectionById(id: string): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { id },
    });
    if (!collection) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['collection not found!'],
        error: 'Not Found',
      });
    }

    return collection;
  }

  /* search a collection */
  async searchCollection(
    query: string,
  ): Promise<{ data: Collection[]; total: number }> {
    let searchedCollection: Collection[] = [];
    if (query) {
      searchedCollection = await this.collectionRepository.find({
        where: {
          title: ILike(`%${query}%`),
        },
      });
    } else {
      searchedCollection = await this.collectionRepository.find();
    }
    const totalSearchedCollection: number = searchedCollection.length;
    if (totalSearchedCollection === 0) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['no results for searched collections'],
        error: 'Not Found',
      });
    }

    return {
      data: searchedCollection,
      total: totalSearchedCollection,
    };
  }

  /* fetch all collection with pagination */
  async fetchAllCollections({
    page,
    limit,
    status,
  }: {
    page: number;
    limit: number;
    status: StatusEnum;
  }): Promise<{
    data: Collection[];
    page: number;
    limit: number;
    total: number;
  }> {
    if (Number(isNaN(page) || Number(isNaN(limit)) || page < 0 || limit < 0)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['page and limit must of positive Integers!'],
        error: 'Bad Request',
      });
    }

    const new_limit: number = limit > 10 ? 10 : limit;

    const [collectionsData, totalCollections] =
      await this.collectionRepository.findAndCount({
        where: {
          status:
            !status || status.trim() === ''
              ? In([StatusEnum.Published, StatusEnum.Draft])
              : status.trim().toLowerCase() === StatusEnum.Published
                ? StatusEnum.Published
                : StatusEnum.Draft,
        },
        skip: (page - 1) * new_limit,
        take: new_limit,
        order: { created_at: 'DESC' },
      });

    return {
      data: collectionsData,
      page,
      limit: new_limit,
      total: totalCollections,
    };
  }

  /* fetch collections with redirects for frontend */
  async fetchCollectionsWithRedirects(): Promise<{ data: any[] }> {
    const collectionsRedirects = await this.collectionRedirectRepository.find();
    const collectionRedirectData: any[] = [];

    for (const redirect of collectionsRedirects) {
      let redirects = null;

      if (redirect.redirect_type === CollectionRedirectTypeEnum.Category) {
        /* category redirect */
        const categoryData = await this.productRepository.find({
          where: {
            category_id: redirect.redirect_id,
          },
        });

        redirects = await Promise.all(
          categoryData.map(async (category) => {
            return { title: category.title, id: category.id };
          }),
        );
      } else if (
        /* product redirect */
        redirect.redirect_type === CollectionRedirectTypeEnum.Product
      ) {
        const productsData = await this.productRepository.findOne({
          where: {
            id: redirect.redirect_id,
          },
        });

        redirects = productsData
          ? { title: productsData.title, id: productsData.id }
          : { title: null, description: null };
      }

      collectionRedirectData.push({
        ...redirect,
        redirects,
      });
    }
    return { data: collectionRedirectData };
  }

  async fetchCollectionsRedirectDataFrontEnd(): Promise<{ data: any[] }> {
    const collections = await this.collectionRepository.find();
    const collectionRedirects = await this.collectionRedirectRepository.find();
    const categories = await this.categoryRepository.find();

    const collectionsDataArray: any[] = [];

    for (const collection of collections) {
      const productsDataArray: any[] = [];

      const redirectsData = collectionRedirects.filter((collectionRedirect) => {
        return collectionRedirect.collection_id === collection.id;
      });

      for (const redirect of redirectsData) {
        if (redirect.redirect_type === CollectionRedirectTypeEnum.Category) {
          const categoryData = await this.productRepository.find({
            where: {
              category_id: redirect.redirect_id,
            },
          });
          productsDataArray.push(...categoryData);
        } else if (
          redirect.redirect_type === CollectionRedirectTypeEnum.Product
        ) {
          const productData = await this.productRepository.findOne({
            where: {
              id: redirect.redirect_id,
            },
          });

          productsDataArray.push(productData);
        }
      }

      collectionsDataArray.push({
        title: collection.title,
        products: productsDataArray.map((product) => {
          const category = categories.find((category) => {
            return category.id === product.category_id;
          });
          return {
            id: product.id,
            title: product.title,
            category_id: category ? category.id : null,
            name: category ? category.title : null,
          };
        }),
      });
    }

    return {
      data: collectionsDataArray,
    };
  }

  async updateCollection(id: string, collectionDto: UpdateCollectionDto) {
    const banner = await this.collectionRedirectRepository.findOne({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['collection not found'],
        error: 'Not Found',
      });
    }

    try {
      await this.collectionRepository.update(
        { id },
        {
          title: collectionDto.title,
          status: collectionDto.status,
          image_url: collectionDto.image_url,
        },
      );

      return await this.collectionRedirectRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while updating the banner', error],
        error: 'Internal server error',
      });
    }
  }

  async deleteCollection(id: string) {
    const collection = await this.collectionRepository.findOne({
      where: { id },
    });

    if (!collection) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['collection not found'],
        error: 'Not Found',
      });
    }

    try {
      await this.collectionRepository.softDelete(id);
      return { id: `${id}`, message: 'collection has been deleted' };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while updating the collection', error],
        error: 'Internal server error',
      });
    }
  }

  /* redirect-services */
  async createCollectionRedirect(
    collectionRedirectDto: CreateCollectionRedirectDto,
  ) {
    const collection = await this.collectionRepository.findOne({
      where: {
        id: collectionRedirectDto.collection_id,
      },
    });

    if (!collection) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [
          `collection with ${collectionRedirectDto.collection_id} not found`,
        ],
        error: 'Not Found',
      });
    }

    /* validate the collection redirect_id and redirect_type */
    if (
      collectionRedirectDto.redirect_type &&
      collectionRedirectDto.redirect_id
    ) {
      if (
        collectionRedirectDto.redirect_type ===
        CollectionRedirectTypeEnum.Category
      ) {
        const category = await this.categoryRepository.findOne({
          where: {
            id: collectionRedirectDto.redirect_id,
          },
        });

        if (!category) {
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: ['Invalid redirect id for category'],
            error: 'Bad Request',
          });
        }
      } else if (
        collectionRedirectDto.redirect_type ===
        CollectionRedirectTypeEnum.Product
      ) {
        const product = await this.productRepository.findOne({
          where: {
            id: collectionRedirectDto.redirect_id,
          },
        });

        if (!product) {
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: ['Invalid redirect id for product'],
            error: 'Bad Request',
          });
        }
      }
    } else {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['redirect_id and redirect_type should not be empty!'],
        error: 'Bad Request',
      });
    }

    /* create a new collection if the valiation passes */
    try {
      const collection_redirect = this.collectionRedirectRepository.create({
        collection_id: collectionRedirectDto.collection_id,
        redirect_id: collectionRedirectDto.redirect_id,
        redirect_type: collectionRedirectDto.redirect_type,
      });

      return await this.collectionRedirectRepository.save(collection_redirect);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating redirect', error],
        error: 'Internal server error',
      });
    }
  }
}
