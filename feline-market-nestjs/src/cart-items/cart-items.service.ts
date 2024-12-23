import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}
  async addItemToCart(dto: CreateCartItemDto): Promise<CartItem> {
    try {
      const item = this.cartItemRepository.create({
        cart: { id: dto.cart_id },
        product: { id: dto.product_id },
        ...dto,
      });
      return this.cartItemRepository.save(item);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while adding item to cart: ${error.message}`,
      );
    }
  }

  async findAllCartItems(): Promise<CartItem[]> {
    try {
      return this.cartItemRepository.find({ relations: ['cart', 'product'] });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving cart items: ${error.message}`,
      );
    }
  }

  async findOneCartItemById(cartItemId: string): Promise<CartItem> {
    try {
      if (!validate(cartItemId)) {
        throw new BadRequestException('Invalid UUID format');
      }
      const cartItem = await this.cartItemRepository.findOneOrFail({
        where: {id: cartItemId},
        relations: ['cart', 'product']
      });
      return cartItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving the cart item: ${error.message}`,
      );
    }
  }

  async updateCartItem(
    cartItemId: string,
    dto: UpdateCartItemDto,
  ): Promise<CartItem> {
    try {
      const cartItem = await this.findOneCartItemById(cartItemId);
      Object.assign(cartItem, dto);
      return this.cartItemRepository.save(cartItem);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while updating the cart item: ${error.message}`,
      );
    }
  }

  async removeCartItem(cartItemId: string): Promise<CartItem> {
    try {
      const cartItem = await this.findOneCartItemById(cartItemId);
      return this.cartItemRepository.remove(cartItem);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while deleting the cart item: ${error.message}`,
      );
    }
  }
}
