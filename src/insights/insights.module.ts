import { forwardRef, Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from 'src/products/products.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Customer, Product]),
    forwardRef(() => CartsModule),
    forwardRef(() => ProductsModule),
    forwardRef(() => CustomersModule),
  ],
  providers: [InsightsService],
  controllers: [InsightsController],
})
export class InsightsModule {}
