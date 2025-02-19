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
import { CreateProductPricingDto } from './dto/create-productPricing.dto';
import { ProductPricing } from './entities/productPricing.entity';
import { ProductPricingRepository } from './repositories/productPricing.repository';
import { UpdateProductPricingDto } from './dto/update-productPricing.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductRepository,
    @InjectRepository(ProductVariant)
    private readonly productsVariantRepository: ProductVariantRepository,
    @InjectRepository(ProductPricingRepository)
    private readonly productPricingRepository: ProductPricingRepository,
  ) {}

  validateProduct = async (productId: string) => {
    const product = await this.productsRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: `product id ${productId} not found`,
      });
    }
  };

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
    status,
    query,
  }: {
    page: number;
    limit: number;
    status: StatusEnum;
    query: string;
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
      where: {
        status:
          status.toLowerCase() === 'published'
            ? StatusEnum.Published
            : StatusEnum.Draft,
        title: ILike(`%${query.trim()}%`),
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
      await this.productPricingRepository.delete({ product_id: id });
      await this.productsVariantRepository.delete({ product_id: id });

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
    await this.validateProduct(productVariantDto.product_id);
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

  /* pricing services */
  async createProductPricing(
    productPricingDto: CreateProductPricingDto,
  ): Promise<ProductPricing> {
    await this.validateProduct(productPricingDto.product_id);
    try {
      const productPrice = this.productPricingRepository.create({
        product_id: productPricingDto.product_id,
        country_code: productPricingDto.country_code,
        currency: productPricingDto.currency,
        price: productPricingDto.price,
        crossed_price: productPricingDto.crossed_price,
        selling_price: productPricingDto.selling_price,
      });

      console.log(productPrice);

      return await this.productPricingRepository.save(productPrice);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [
          'some error occured while creating pricing for the product',
          error,
        ],
        error: 'Internal Server',
      });
    }
  }

  async getProductPricingById(id: string): Promise<ProductPricing> {
    const productPricing = await this.productPricingRepository.findOne({
      where: { id: id },
    });

    if (!productPricing) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`product pricing not found`],
        error: 'Not Found',
      });
    }

    return await this.productPricingRepository.findOne({
      where: { id: id },
    });
  }

  async updateProductPricing(
    id: string,
    productPricingDto: UpdateProductPricingDto,
  ): Promise<ProductPricing> {
    const productPricing = await this.productPricingRepository.findOne({
      where: {
        id,
      },
    });

    if (!productPricing) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`product pricing not found`],
        error: 'Not Found',
      });
    }

    try {
      await this.productPricingRepository.update(
        { id },
        {
          product_id: productPricingDto.product_id,
          country_code: productPricingDto.country_code,
          currency: productPricingDto.currency,
          price: productPricingDto.price,
          selling_price: productPricingDto.selling_price,
          crossed_price: productPricingDto.selling_price,
        },
      );

      return await this.productPricingRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [
          'some error occured while creating a updating the pricing for the product',
          error,
        ],
        error: 'Internal server error',
      });
    }
  }

  async deleteProductPricing(
    id: string,
  ): Promise<{ id: string; message: string }> {
    const productPricing = await this.productPricingRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!productPricing) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`product pricing not found`],
        error: 'Not Found',
      });
    }

    await this.productPricingRepository.delete(id);

    return {
      id: `${id}`,
      message: 'product pricing has been deleted',
    };
  }
}
