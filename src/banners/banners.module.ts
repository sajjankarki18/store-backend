import { forwardRef, Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { BannersAdminController } from './banners.admin.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { BannersControllers } from './banners.controller';
import { CollectionsModule } from 'src/collections/collections.module';
import { Collection } from 'src/collections/entities/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner, Category, Product, Collection]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ProductsModule),
    forwardRef(() => CollectionsModule),
  ],
  controllers: [BannersAdminController, BannersControllers],
  providers: [BannersService],
})
export class BannersModule {}
