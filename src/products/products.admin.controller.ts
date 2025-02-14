import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-productVariant.dto';
import { UpdateProductVariantDto } from './dto/update-productVariant.dto';

@Controller('/admin/products')
export class ProductsAdminController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() productDto: CreateProductDto) {
    return this.productsService.createProduct(productDto);
  }

  @Get()
  fetchAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    if (!page || !limit) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['page and limit fields are empty!'],
        error: 'Bad Request',
      });
    }
    return this.productsService.fetchAllProducts({ page, limit });
  }

  @Get('/search')
  searchProduct(@Query('q') query: string) {
    return this.productsService.searchProduct(query);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() productDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, productDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  /* variants api */
  @Post('/product-variant')
  createProductVariant(@Body() productVariantDto: CreateProductVariantDto) {
    return this.productsService.createProductVariant(productVariantDto);
  }

  @Get('/product-variant/:id')
  getProductVariantById(@Param('id') id: string) {
    return this.productsService.getProductVariantById(id);
  }

  @Put('/product-variant/:id')
  updateProductVariant(
    @Param('id') id: string,
    @Body() productVariantDto: UpdateProductVariantDto,
  ) {
    return this.productsService.updateProductVariant(id, productVariantDto);
  }

  @Delete('/product-variant/:id')
  deleteProductVariant(@Param('id') id: string) {
    return this.productsService.deleteProductVariant(id);
  }
}
