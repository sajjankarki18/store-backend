import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StatusEnum } from 'src/enums/status.enum';
import { ILike } from 'typeorm';
import { CreateProductVariantDto } from './dto/create-productVariant.dto';
import { ProductVariant } from './entities/productVariant.entity';
import { ProductVariantRepository } from './repositories/productVariant.repository';
import { UpdateProductVariantDto } from './dto/update-productVariant.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductRepository,
    @InjectRepository(ProductVariant)
    private readonly productsVariantRepository: ProductVariantRepository,
  ) {}

  async createProduct(productDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        title: productDto.title,
        description: productDto.description,
        category_id: productDto.category_id,
        status: productDto.status || StatusEnum.Draft,
      });

      return await this.productsRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating the product', error],
        error: 'Internal server error',
      });
    }
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['product not found!'],
        error: 'Not Found',
      });
    }
    return product;
  }

  async fetchAllProducts({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<{ data: Product[]; page: number; limit: number; total: number }> {
    if (isNaN(Number(page)) || isNaN(Number(limit)) || page < 0 || limit < 0) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['page and limits must be of positive integers'],
        error: 'Bad request',
      });
    }

    const new_limit: number =
      limit > 10 ? parseInt(process.env.PAGE_LIMIT) : limit;

    const [data, total] = await this.productsRepository.findAndCount({
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

  async searchProduct(
    query: string,
  ): Promise<{ data: Product[]; total: number }> {
    let searchedProducts: Product[];
    if (query) {
      searchedProducts = await this.productsRepository.find({
        where: {
          title: ILike(`%${query.trim()}%`),
        },
      });
    } else {
      searchedProducts = await this.productsRepository.find();
    }

    const products_length: number = searchedProducts.length;

    if (products_length == 0) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['no results for searched products'],
        error: 'Not Found',
      });
    }

    return {
      data: searchedProducts,
      total: products_length,
    };
  }

  async updateProduct(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['product not found'],
        error: 'Not Found',
      });
    }

    try {
      await this.productsRepository.update(
        { id },
        {
          title: productDto.title,
          description: productDto.description,
          category_id: productDto.category_id,
          status: productDto.status,
        },
      );

      return await this.productsRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating the product', error],
        error: 'Internal server error',
      });
    }
  }

  async deleteProduct(id: string): Promise<{ id: string; message: string }> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['product not found'],
        error: 'Not Found',
      });
    }

    try {
      await this.productsRepository.softDelete(id);

      return {
        id: `${id}`,
        message: 'product has been deleted',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['some error occured while creating the product', error],
        error: 'Internal server error',
      });
    }
  }

  /* variants services */
  async createProductVariant(
    productVariantDto: CreateProductVariantDto,
  ): Promise<ProductVariant> {
    //before creating the product-variant check if the product_id exists in the product database
    const product = await this.productsRepository.findOne({
      where: {
        id: productVariantDto.product_id,
      },
    });

    if (!product) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [
          `variant could not be created, product_id ${productVariantDto.product_id} does not exists`,
        ],
        error: 'Not Found',
      });
    }
    try {
      const productVariant = this.productsVariantRepository.create({
        product_id: productVariantDto.product_id,
        color: productVariantDto.color,
        size: productVariantDto.size,
      });

      return await this.productsVariantRepository.save(productVariant);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [
          'some error occured while creating a variant for the product',
          error,
        ],
        error: 'Internal server error',
      });
    }
  }

  async getProductVariantById(variantId: string): Promise<ProductVariant> {
    const productVariant = await this.productsVariantRepository.findOne({
      where: { id: variantId },
    });

    if (!productVariant) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`product variant not found`],
        error: 'Not Found',
      });
    }

    return await this.productsVariantRepository.findOne({
      where: { id: variantId },
    });
  }

  async updateProductVariant(
    id: string,
    productVariantDto: UpdateProductVariantDto,
  ): Promise<ProductVariant> {
    const productVariant = await this.productsVariantRepository.findOne({
      where: {
        id,
      },
    });

    if (!productVariant) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`product variant not found`],
        error: 'Not Found',
      });
    }

    try {
      await this.productsVariantRepository.update(
        { id },
        {
          product_id: productVariantDto.product_id,
          color: productVariantDto.color,
          size: productVariantDto.size,
        },
      );

      return await this.productsVariantRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [
          'some error occured while creating a updating the variant for the product',
          error,
        ],
        error: 'Internal server error',
      });
    }
  }

  async deleteProductVariant(
    id: string,
  ): Promise<{ id: string; message: string }> {
    const productVariant = await this.productsVariantRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!productVariant) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`product variant not found`],
        error: 'Not Found',
      });
    }

    await this.productsVariantRepository.delete(id);

    return {
      id: `${id}`,
      message: 'product variant has been deleted',
    };
  }
}
