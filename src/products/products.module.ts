import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsAdminController } from './products.admin.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductVariant } from './entities/productVariant.entity';
import { ProductPricing } from './entities/productPricing.entity';
import { ProductPricingRepository } from './repositories/productPricing.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariant, ProductPricing]),
  ],
  controllers: [ProductsAdminController],
  providers: [ProductsService, ProductRepository, ProductPricingRepository],
  exports: [ProductRepository],
})
export class ProductsModule {}
