import { CartService } from './carts.service';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    cartActions(cartItemDto: CreateCartItemDto): Promise<import("typeorm").UpdateResult | import("./entities/cartItem.entity").CartItem>;
}
