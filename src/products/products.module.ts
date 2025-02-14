import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsAdminController } from './products.admin.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductVariant } from './entities/productVariant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVariant])],
  controllers: [ProductsAdminController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductsModule {}
