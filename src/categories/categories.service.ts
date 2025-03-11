import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/Category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { StatusEnum } from 'src/enums/status.enum';
import { ILike, IsNull } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductRepository } from '../products/repositories/product.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository(Product)
    private readonly productsRepository: ProductRepository,
  ) {}

  validateCategoryUpdation = async (
    categoryDto: UpdateCategoryDto,
  ): Promise<void> => {
    if (categoryDto.parent_id) {
      const childCategory = await this.categoryRepository.findOne({
        where: {
          id: categoryDto.parent_id,
        },
      });

      if (!childCategory) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: ['category not found!'],
          error: 'Not Found',
        });
      }

      const parentCategory = await this.categoryRepository.findOne({
        where: {
          id: childCategory.parent_id,
        },
      });

      if (parentCategory && parentCategory.parent_id) {
        const grandParentCategory = await this.categoryRepository.findOne({
          where: {
            id: parentCategory.parent_id,
          },
        });

        if (grandParentCategory) {
          throw new ConflictException({
            statusCode: HttpStatus.CONFLICT,
            message: ['category could not be updated more than 3 levels'],
            error: ['Conflict'],
          });
        }
      }
    }
  };

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create({
        title: categoryDto.title,
        description: categoryDto.description,
        parent_id: categoryDto.parent_id,
        status: categoryDto.status || StatusEnum.Draft,
      });

      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating the category', error],
        error: 'Internal server error',
      });
    }
  }

  /* fetch parent categories to frontend */
  async fetchAllParentCategories(): Promise<{ data: Category[] }> {
    const parentCategories = await this.categoryRepository.find({
      where: {
        parent_id: IsNull(),
        status: StatusEnum.Published,
        is_active: true,
      },
    });

    return {
      data: parentCategories,
    };
  }

  /* display the categorues with the products related to the child categories */
  async fetchAllCategoriesWithChildProducts(): Promise<{ data: Category[] }> {
    const parentCategories = await this.categoryRepository.find({
      where: {
        parent_id: IsNull(),
        status: StatusEnum.Published,
        is_active: true,
      },
    });

    const categoriesData: any[] = [];

    for (const parentCategory of parentCategories) {
      const childCategories = await this.categoryRepository.find({
        where: {
          parent_id: parentCategory.id,
          status: StatusEnum.Published,
          is_active: true,
        },
      });

      const childrenData: any[] = [];

      for (const childCategory of childCategories) {
        const products = await this.productsRepository.find({
          where: {
            category_id: childCategory.id,
            status: StatusEnum.Published,
            is_active: true,
          },
        });

        childrenData.push({
          title: childCategory.title,
          id: childCategory.id,
          products: products.map((product) => ({
            id: product.id,
            title: product.title,
            status: product.status,
          })),
        });
      }

      const hashMore: boolean = childrenData.length > 5 ? true : false;

      categoriesData.push({
        title: parentCategory.title,
        id: parentCategory.id,
        children: childrenData,
        hashMore: hashMore,
      });
    }

    return {
      data: categoriesData,
    };
  }

  //fetch all categories with pagination feature,
  async fetchAllCategories({
    page,
    limit,
    status,
    query,
  }: {
    page: number;
    limit: number;
    status: StatusEnum;
    query: string;
  }): Promise<{
    data: Category[];
    page: number;
    limit: number;
    total: number;
  }> {
    if (isNaN(Number(page)) || isNaN(Number(limit)) || page < 0 || limit < 0) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['page and limits must be of positive integers'],
        error: 'Bad request',
      });
    }

    const new_limit: number =
      limit > 10 ? parseInt(process.env.PAGE_LIMIT) : limit;

    const [data, total] = await this.categoryRepository.findAndCount({
      where: {
        status:
          status.toLowerCase() === 'published'
            ? StatusEnum.Published
            : StatusEnum.Draft,
        title: query ? ILike(`%${query.trim()}%`) : null,
      },
      skip: (page - 1) * new_limit,
      take: new_limit,
      order: { created_at: 'desc' },
    });
    return {
      data,
      page,
      limit: new_limit,
      total,
    };
  }

  async fetchCategoryById(id: string): Promise<{ data: Category }> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['category not found!'],
        error: 'Not Found',
      });
    }

    return { data: category };
  }

  async updateCategory(
    id: string,
    categoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['category not found!'],
        error: 'Not Found',
      });
    }

    //validate the category to restrict the updation upto only three levels
    await this.validateCategoryUpdation(categoryDto);

    try {
      await this.categoryRepository.update(
        { id },
        {
          title: categoryDto.title,
          description: categoryDto.description,
          parent_id: categoryDto.parent_id,
          image_url: categoryDto.image_url,
          status: categoryDto.status,
        },
      );

      return await this.categoryRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating the category', error],
        error: 'Internal server error',
      });
    }
  }

  async deleteCategory(id: string): Promise<{ id: string; message: string }> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['category not found!'],
        error: 'Not Found',
      });
    }

    /*
    When deleting a certain category, follow these rules.
    If a category have a parent_id of null, then it is a parent category.
    If a category have parent_id which is not null, then it is a child category.
    
    So, while deleting a category check weather the certain category have sub-categories within it i.e child categories.
    If it does, then restrict the FE from deleting the category that have child, which distrupts the parent-child relationship.

    If there are no child-category exists, then allow the FE to delete the category.
    */

    if (category.parent_id === null) {
      //if the parent_id is null, then it is a parent category and check if there are child categories to that parent
      const child_categories = await this.categoryRepository.find({
        where: {
          parent_id: id,
        },
      });

      //if the child category associated to that parent exists, then resitrict the FE from deleteing the parent
      if (child_categories.length > 0) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: [
            'category could not be deleted, it has existing child categories',
          ],
          error: 'Conflict',
        });
      }
    } else if (category.parent_id !== null) {
      /*
      Case - 2 category might have 3 levels parent-child-grandChild relations
      case where the category might also have a grand-child category
      */
      const grandChild_categories = await this.categoryRepository.find({
        where: {
          parent_id: id,
        },
      });

      if (grandChild_categories.length > 0) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: [
            'category could not be deleted, it has existing child categories',
          ],
          error: 'Conflict',
        });
      }
    }

    await this.categoryRepository.softDelete(id);

    return {
      id: `${id}`,
      message: 'category has been deleted',
    };
  }
}
