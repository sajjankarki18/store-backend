import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './repositories/cart.repository';
import { CartItem } from './entities/cartItem.entity';
import { CartItemRepository } from './repositories/cartItem.repository';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { Product } from '../products/entities/product.entity';
import { ProductRepository } from '../products/repositories/product.repository';
import { ProductVariant } from 'src/products/entities/productVariant.entity';
import { ProductVariantRepository } from '../products/repositories/productVariant.repository';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: CartItemRepository,
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: ProductVariantRepository,
  ) {}

  /* cart actions logic */
  async cartActions(cartItemDto: CreateCartItemDto) {
    let cartQuantity: number = 0;

    const cartItems = await this.cartItemRepository.find();
    const productVariant = await this.cartItemRepository.findOne({
      where: {
        variant_id: cartItemDto.variant_id,
      },
    });

    /* Delete the carts that have quantity -> 0 */
    cartItems.forEach((cartItem) => {
      if (cartItem.quantity <= 0) {
        this.cartItemRepository.delete(cartItem.id);
      }
    });

    /* proceed to update the quantity */
    if (cartItemDto.quantity >= 0 && cartItemDto.quantity <= 20) {
      const variant = await this.productVariantRepository.findOne({
        where: {
          id: cartItemDto.variant_id,
        },
      });

      const product = await this.productRepository.findOne({
        where: {
          id: variant.product_id,
        },
      });

      /* if the user is updating the existing variant, then update the quantity of it */
      if (productVariant) {
        cartQuantity = cartItemDto.quantity;
        return await this.cartItemRepository.update(productVariant.id, {
          quantity: cartQuantity,
        });
      } else {
        /* create new a new cart_item if the product variant is new */
        const cartItem = this.cartItemRepository.create({
          product_title: product.title,
          product_id: product.id,
          variant_id: cartItemDto.variant_id,
          quantity: cartItemDto.quantity,
          price: cartItemDto.price,
          cart_id: cartItemDto.cart_id,
        });

        return await this.cartItemRepository.save(cartItem);
      }
    } else {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: [
          'quantity limit exeeded, selected quantity must be less than equal to 20',
        ],
        error: 'Conflict',
      });
    }
  }
}
