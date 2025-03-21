import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';

@ApiTags('Collections Frontend')
@Controller('/collections')
export class CollectionsController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('/redirects')
  fetchCollectionsWithRedirects() {
    return this.collectionService.fetchCollectionsWithRedirects();
  }

  @Get('/redirect-data')
  fetchCollectionsRedirectDataFrontEnd() {
    return this.collectionService.fetchCollectionsRedirectDataFrontEnd();
  }
}
