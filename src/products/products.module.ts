import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsAdminController } from './products.admin.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductVariant } from './entities/productVariant.entity';
import { ProductPricing } from './entities/productPricing.entity';
import { ProductPricingRepository } from './repositories/productPricing.repository';
import { ProductsController } from './products.controller';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductVariant,
      ProductPricing,
      Category,
    ]),
  ],
  controllers: [ProductsAdminController, ProductsController],
  providers: [ProductsService, ProductRepository, ProductPricingRepository],
  exports: [ProductRepository],
})
export class ProductsModule {}
