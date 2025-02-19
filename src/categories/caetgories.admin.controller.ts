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
import { StatusEnum } from 'src/enums/status.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Categories')
@Controller('/admin/categories')
export class CategoriesAdminController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new Category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  createCategory(@Body() categoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }

  @ApiOperation({ summary: 'Find all Category' })
  @ApiResponse({ status: 201, description: 'Category fetched sucessfully' })
  @Get()
  fetchAllCategories(
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
    return this.categoriesService.fetchAllCategories({
      page,
      limit,
      status,
      query,
    });
  }

  @ApiOperation({ summary: 'Find Category by Id' })
  @ApiResponse({ status: 201, description: 'Category found' })
  @ApiResponse({ status: 400, description: 'Category not found' })
  @Get('/:id')
  fetchCategoryById(@Param('id') id: string) {
    return this.categoriesService.fetchCategoryById(id);
  }

  @ApiOperation({ summary: 'Update a Category' })
  @ApiResponse({ status: 201, description: 'Category updated' })
  @ApiResponse({ status: 400, description: 'Category not found' })
  @Put('/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryDto);
  }

  @ApiOperation({ summary: 'Delete a Category' })
  @ApiResponse({ status: 201, description: 'Category deleted' })
  @ApiResponse({ status: 400, description: 'Category not found' })
  @Delete('/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
