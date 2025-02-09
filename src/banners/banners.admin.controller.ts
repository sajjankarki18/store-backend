import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('/admin/banners')
export class BannersAdminController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  createBanner(@Body() bannerDto: CreateBannerDto) {
    return this.bannersService.createBanner(bannerDto);
  }

  @Get('/:id')
  findBannerById(@Param('id') id: string) {
    return this.bannersService.findBannerById(id);
  }

  @Get()
  fetchAllBanners() {
    return this.bannersService.fetchAllBanners();
  }

  @Put('/:id')
  updateBanner(@Param('id') id: string, @Body() bannerDto: UpdateBannerDto) {
    return this.bannersService.updateBanner(id, bannerDto);
  }

  @Delete('/:id')
  deleteBanner(@Param('id') id: string) {
    return this.bannersService.deleteBanner(id);
  }
}
