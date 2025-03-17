import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannersService } from '../banners/banners.service';

@ApiTags('Collections Frontend')
@Controller('/collections')
export class BannersController {
  constructor(private readonly bannerService: BannersService) {}

  @Get('/redirects')
  fetchCollectionsWithRedirects() {}
}
