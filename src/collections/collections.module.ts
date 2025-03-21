import { forwardRef, Module } from '@nestjs/common';
import { CollectionsAdminController } from './collection.admin.controller';
import { CollectionService } from './collection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionRedirect } from './entities/CollectionRedirect.entity';
import { Collection } from './entities/collection.entity';
import { CollectionRepository } from './repositories/collection.repository';
import { Category } from '../categories/entities/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';
import { CollectionsController } from './collection.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Collection,
      CollectionRedirect,
      Category,
      Product,
    ]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [CollectionsAdminController, CollectionsController],
  providers: [CollectionService, CollectionRepository],
  exports: [CollectionRepository],
})
export class CollectionsModule {}
