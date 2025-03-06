import { forwardRef, Module } from '@nestjs/common';
import { CartController } from './carts.controller';
import { CartService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from '../products/entities/productVariant.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product, ProductVariant]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartsModule {}
