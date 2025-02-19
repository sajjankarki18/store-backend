import { Controller, Get } from '@nestjs/common';
import { BannersService } from './banners.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Banners Frontend')
@Controller('/banners')
export class BannersControllers {
  constructor(private readonly bannersService: BannersService) {}

  @ApiOperation({ summary: 'Fetch banners for front-end' })
  @ApiOperation({ description: 'Banners fetched sucessfully' })
  @Get()
  fetchAllBannersFE() {
    return this.bannersService.fetchAllBannersFE();
  }

  @ApiOperation({ summary: 'Fetch banners with redirect informations' })
  @ApiOperation({ description: 'Banners with redirects fetched sucessfully' })
  @Get('/redirects')
  fetchBannersWithRedirects() {
    return this.bannersService.fetchBannersWithRedirects();
  }
}
