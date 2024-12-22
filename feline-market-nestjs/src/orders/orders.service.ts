import { CreateOrderDto } from './dto/create-order.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    try {
      if (!validate(userId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }
      const user = await this.userRepository.findOneByOrFail({ id: userId });
      const order = this.orderRepository.create({
        ...dto,
        user,
      });
      return this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating order: ${error.message}`,
      );
    }
  }

  async findAllOrders(): Promise<Order[]> {
    try {
      return this.orderRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving all orders: ${error.message}`,
      );
    }
  }

  async findOneOrderById(orderId: string): Promise<Order> {
    try {
      if (!validate(orderId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }
      return this.orderRepository.findOneOrFail({
        where: { id: orderId },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving the order: ${error.message}`,
      );
    }
  }

  async updateOrder(orderId: string, dto: UpdateOrderDto): Promise<Order> {
    try {
      const order = await this.findOneOrderById(orderId);
      Object.assign(order, dto);
      return this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while updating the order: ${error.message}`,
      );
    }
  }

  async removeOrder(orderId: string): Promise<Order> {
    try {
      const order = await this.findOneOrderById(orderId);
      return this.orderRepository.remove(order);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while deleting the order: ${error.message}`,
      );
    }
  }
}