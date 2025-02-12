import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('/admin/products')
export class ProductsAdminController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() productDto: CreateProductDto) {
    return this.productsService.createProduct(productDto);
  }

  @Get('/:id')
  findProductById(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }
}
