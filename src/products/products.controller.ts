import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /* get route that fetched products data with related variants and pricing */
  @Get()
  fetchProductsData() {
    return this.productsService.fetchProductsData();
  }
}
