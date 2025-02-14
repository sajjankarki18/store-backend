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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('/admin/categories')
export class CategoriesAdminController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() categoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }

  @Get()
  fetchAllCategories(
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
    return this.categoriesService.fetchAllCategories({ page, limit });
  }

  @Get('/:id')
  fetchCategoryById(@Param('id') id: string) {
    return this.categoriesService.fetchCategoryById(id);
  }

  @Put('/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryDto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
