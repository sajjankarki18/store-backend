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
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionRedirectDto } from './dto/create-collectionRedirect.dto';
import { StatusEnum } from 'src/enums/status.enum';

@Controller('/admin/collections')
export class CollectionsAdminController {
  constructor(private readonly collecitonService: CollectionService) {}

  @ApiOperation({ summary: 'Create a new Collection' })
  @ApiResponse({ status: 201, description: 'Collection created sucessfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  createCollection(@Body() collectionDto: CreateCollectionDto) {
    return this.collecitonService.createCollection(collectionDto);
  }

  @ApiOperation({ summary: 'Search a collection' })
  @ApiResponse({ status: 201, description: 'fetched searched collection' })
  @Get('/search')
  searchCollection(@Query('q') query: string) {
    return this.collecitonService.searchCollection(query);
  }

  @ApiOperation({ summary: 'Find collection by Id' })
  @ApiResponse({ status: 201, description: 'collection found' })
  @ApiResponse({ status: 400, description: 'collection not found' })
  @Get('/:id')
  findCollectionById(@Param('id') id: string) {
    return this.collecitonService.findCollectionById(id);
  }

  @ApiOperation({ summary: 'Find all collections' })
  @ApiResponse({ status: 201, description: 'collections fetched sucessfully' })
  @Get()
  fetchAllCollections(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status: StatusEnum,
  ) {
    if (!page || !limit) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['page and limit are empty!'],
        error: 'Bad Request',
      });
    }
    return this.collecitonService.fetchAllCollections({ page, limit, status });
  }

  @ApiOperation({ summary: 'Update a collection' })
  @ApiResponse({ status: 201, description: 'collection updated' })
  @ApiResponse({ status: 400, description: 'collection not found' })
  @Put('/:id')
  updateCollection(
    @Param('id') id: string,
    @Body() collectionDto: UpdateCollectionDto,
  ) {
    return this.collecitonService.updateCollection(id, collectionDto);
  }

  @ApiOperation({ summary: 'Delete a collection' })
  @ApiResponse({ status: 201, description: 'collection deleted' })
  @ApiResponse({ status: 400, description: 'collection not found' })
  @Delete('/:id')
  deleteCollection(@Param('id') id: string) {
    return this.collecitonService.deleteCollection(id);
  }

  /* collection-redirect API */
  @ApiOperation({ summary: 'Create a new Collection redirect' })
  @ApiResponse({
    status: 201,
    description: 'Collection redirect created sucessfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('/collection-redirect')
  createCollectionRedirect(
    @Body() collectionRedirectDto: CreateCollectionRedirectDto,
  ) {
    return this.collecitonService.createCollectionRedirect(
      collectionRedirectDto,
    );
  }
}
