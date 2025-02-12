import { forwardRef, Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { BannersAdminController } from './banners.admin.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner, Category, Product]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [BannersAdminController],
  providers: [BannersService],
})
export class BannersModule {}
