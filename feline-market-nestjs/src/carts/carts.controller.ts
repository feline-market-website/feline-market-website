import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(
    @Body() createCartDto: CreateCartDto,
  ): Promise<{ message: string; data: Cart }> {
    const createdCart = await this.cartsService.createCart(createCartDto);
    return { message: 'Cart has created successfully', data: createdCart };
  }

  @Get()
  async findAll(): Promise<{ message: string; data: Cart[] }> {
    const carts = await this.cartsService.findAllCarts();
    return { message: 'Carts have retrieved successfully', data: carts };
  }

  @Get('cartId')
  async findOne(
    @Param('cartId') cartId: string,
  ): Promise<{ message: string; data: Cart }> {
    const cart = await this.cartsService.findOneCartById(cartId);
    return { message: 'Cart has retrieved successfully', data: cart };
  }
}
