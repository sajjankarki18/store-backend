import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './carts.service';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Carts')
@Controller('/carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /* add a new item to the cart */
  @ApiOperation({ summary: 'Add an item to the cart' })
  @ApiResponse({ status: 201, description: 'Added to cart' })
  @ApiResponse({
    status: 200,
    description: 'Some error occured while adding an item to cart',
  })
  @Post()
  cartActions(@Body() cartItemDto: CreateCartItemDto) {
    return this.cartService.cartActions(cartItemDto);
  }
}
