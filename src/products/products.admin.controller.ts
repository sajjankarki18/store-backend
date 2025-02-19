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
import { CreateProductPricingDto } from './dto/create-productPricing.dto';
import { UpdateProductPricingDto } from './dto/update-productPricing.dto';
import { StatusEnum } from 'src/enums/status.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Products')
@Controller('/admin/products')
export class ProductsAdminController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new Products' })
  @ApiResponse({ status: 201, description: 'Products created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  @Post()
  createProduct(@Body() productDto: CreateProductDto) {
    return this.productsService.createProduct(productDto);
  }

  @ApiOperation({ summary: 'Find all Products' })
  @ApiResponse({ status: 201, description: 'Products fetched sucessfully' })
  @Get()
  fetchAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status: StatusEnum,
    @Query('q') query: string,
  ) {
    if (!page || !limit) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['page and limit fields are empty!'],
        error: 'Bad Request',
      });
    }
    return this.productsService.fetchAllProducts({
      page,
      limit,
      status,
      query,
    });
  }

  @ApiOperation({ summary: 'Search a Products' })
  @ApiResponse({ status: 201, description: 'fetched searched products' })
  @Get('/search')
  searchProduct(@Query('q') query: string) {
    return this.productsService.searchProduct(query);
  }

  @ApiOperation({ summary: 'Update a Products' })
  @ApiResponse({ status: 201, description: 'Products updated' })
  @ApiResponse({ status: 400, description: 'Products not found' })
  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() productDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, productDto);
  }

  @ApiOperation({ summary: 'Delete a Products' })
  @ApiResponse({ status: 201, description: 'Products deleted' })
  @ApiResponse({ status: 400, description: 'Products not found' })
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

  /* product pricing field */
  @Post('/pricing')
  createProductPricing(@Body() productPricingDto: CreateProductPricingDto) {
    return this.productsService.createProductPricing(productPricingDto);
  }

  @Get('/pricing/:id')
  getProductPricingById(@Param('id') id: string) {
    return this.productsService.getProductPricingById(id);
  }

  @Put('/pricing/:id')
  updateProductPricing(
    @Param('id') id: string,
    @Body() productPricingDto: UpdateProductPricingDto,
  ) {
    return this.productsService.updateProductPricing(id, productPricingDto);
  }

  @Delete('/pricing/:id')
  deleteProductPricing(@Param('id') id: string) {
    return this.productsService.deleteProductPricing(id);
  }
}
