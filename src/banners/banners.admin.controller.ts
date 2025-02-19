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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Banners')
@Controller('/admin/banners')
export class BannersAdminController {
  constructor(private readonly bannersService: BannersService) {}

  @ApiOperation({ summary: 'Create a new banner' })
  @ApiResponse({ status: 201, description: 'Banner created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  createBanner(@Body() bannerDto: CreateBannerDto) {
    return this.bannersService.createBanner(bannerDto);
  }

  @ApiOperation({ summary: 'Find banner by Id' })
  @ApiResponse({ status: 201, description: 'Banner found' })
  @ApiResponse({ status: 400, description: 'Banner not found' })
  @Get('/:id')
  findBannerById(@Param('id') id: string) {
    return this.bannersService.findBannerById(id);
  }

  @ApiOperation({ summary: 'Find all banner' })
  @ApiResponse({ status: 201, description: 'Banner fetched sucessfully' })
  @Get()
  fetchAllBanners() {
    return this.bannersService.fetchAllBanners();
  }

  @ApiOperation({ summary: 'Update a Banner' })
  @ApiResponse({ status: 201, description: 'Banner updated' })
  @ApiResponse({ status: 400, description: 'Banner not found' })
  @Put('/:id')
  updateBanner(@Param('id') id: string, @Body() bannerDto: UpdateBannerDto) {
    return this.bannersService.updateBanner(id, bannerDto);
  }

  @ApiOperation({ summary: 'Delete a banner' })
  @ApiResponse({ status: 201, description: 'Banner deleted' })
  @ApiResponse({ status: 400, description: 'Banner not found' })
  @Delete('/:id')
  deleteBanner(@Param('id') id: string) {
    return this.bannersService.deleteBanner(id);
  }
}
