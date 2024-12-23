import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async createCart(dto: CreateCartDto): Promise<Cart> {
    try {
      const cart = this.cartRepository.create({
        user: { id: dto.user_id },
      });
      return this.cartRepository.save(cart);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating cart: ${error.message}`,
      );
    }
  }

  async findAllCarts(): Promise<Cart[]> {
    try {
      return this.cartRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving all carts: ${error.message}`,
      );
    }
  }

  async findOneCartById(cartId: string): Promise<Cart> {
    try {
      if (!validate(cartId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }
      const cart = await this.cartRepository.findOneByOrFail({ id: cartId });
      return cart;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving the cart: ${error.message}`,
      );
    }
  }
}
