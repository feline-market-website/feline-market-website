import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() dto: CreateCartItemDto,
  ): Promise<{ message: string; data: CartItem }> {
    const cartItem = await this.cartItemsService.addItemToCart(dto);
    return {
      message: 'Cart item has added to cart successfully',
      data: cartItem,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ message: string; data: CartItem[] }> {
    const cartItems = await this.cartItemsService.findAllCartItems();
    return {
      message: 'Cart items have retrieved successfully',
      data: cartItems,
    };
  }

  @Get(':cartItemId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('cartItemId') cartItemId: string,
  ): Promise<{ message: string; data: CartItem }> {
    const cartItem =
      await this.cartItemsService.findOneCartItemById(cartItemId);
    return { message: 'Cart item has retrieved successfully', data: cartItem };
  }

  @Patch(':cartItemId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('cartItemId') cartItemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<{ message: string; data: CartItem }> {
    const cartItem = await this.cartItemsService.updateCartItem(
      cartItemId,
      updateCartItemDto,
    );
    return { message: 'Cart item has update successfully', data: cartItem };
  }

  @Delete(':cartItemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('cartItemId') cartItemId: string,
  ): Promise<{ message: string }> {
    await this.cartItemsService.removeCartItem(cartItemId);
    return { message: 'Cart item has removed successfully' };
  }
}
