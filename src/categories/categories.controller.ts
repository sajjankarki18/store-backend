import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories Frontend')
@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /* get route to display only the parent categories */
  @ApiOperation({ summary: 'Find all Category for frontend' })
  @ApiResponse({ status: 201, description: 'Category fetched sucessfully' })
  @Get('all-parent')
  fetchAllParentCategories() {
    return this.categoriesService.fetchAllParentCategories();
  }

  /* get route to display the categories with child products */
  @ApiOperation({
    summary: 'Find all Category with products related to child categories',
  })
  @ApiResponse({
    status: 201,
    description: 'Categories with child products fetched sucessfully',
  })
  @Get()
  fetchAllCategoriesWithChildProducts() {
    return this.categoriesService.fetchAllCategoriesWithChildProducts();
  }
}
