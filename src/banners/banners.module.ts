import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { BannersAdminController } from './banners.admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannersAdminController],
  providers: [BannersService],
})
export class BannersModule {}
