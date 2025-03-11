import { CartRepository } from './repositories/cart.repository';
import { CartItem } from './entities/cartItem.entity';
import { CartItemRepository } from './repositories/cartItem.repository';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { ProductRepository } from '../products/repositories/product.repository';
import { ProductVariantRepository } from '../products/repositories/productVariant.repository';
export declare class CartService {
    private readonly cartRepository;
    private readonly cartItemRepository;
    private readonly productRepository;
    private readonly productVariantRepository;
    constructor(cartRepository: CartRepository, cartItemRepository: CartItemRepository, productRepository: ProductRepository, productVariantRepository: ProductVariantRepository);
    cartActions(cartItemDto: CreateCartItemDto): Promise<import("typeorm").UpdateResult | CartItem>;
}
