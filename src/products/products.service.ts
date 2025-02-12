import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: ProductRepository,
  ) {}

  async createProduct(productDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        title: productDto.title,
        description: productDto.description,
        category_id: productDto.category_id,
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
}
