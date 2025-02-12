import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesAdminController } from './caetgories.admin.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './repositories/Category.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesAdminController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoriesModule {}
