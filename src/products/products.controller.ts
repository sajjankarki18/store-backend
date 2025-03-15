import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { addProductReviewDto } from './dto/add-productReview.dto';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /* get route that fetched products data with related variants and pricing */
  @Get()
  fetchProductsData() {
    return this.productsService.fetchProductsData();
  }

  @Post('/add-review')
  addProductReview(
    @Req() req: any,
    @Body() productReviewDto: addProductReviewDto,
  ) {
    return this.productsService.addProductReview(req, productReviewDto);
  }
}
