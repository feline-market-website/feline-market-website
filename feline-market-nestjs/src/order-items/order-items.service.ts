import { CreateOrderItemDto } from './dto/create-order-item.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly orderService: OrdersService,
  ) {}
  async addItemToOrder(dto: CreateOrderItemDto): Promise<OrderItem> {
    try {
      const orderItem = this.orderItemRepository.create({
        order: { id: dto.order_id },
        product: { id: dto.product_id },
        quantity: dto.quantity,
        price: dto.price,
      });
      const savedOrderItem = await this.orderItemRepository.save(orderItem);
      await this.orderService.updateOrderTotalPrice(dto.order_id);
      return savedOrderItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurring while adding item to the order: ${error.message}`,
      );
    }
  }

  async findAllOrderItems(): Promise<OrderItem[]> {
    try {
      return this.orderItemRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurring while retrieving all items: ${error.message}`,
      );
    }
  }

  async findOneOrderItem(orderItemId: string): Promise<OrderItem> {
    try {
      if (!validate(orderItemId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }
      return this.orderItemRepository.findOneOrFail({
        where: { id: orderItemId },
        relations: ['order'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurring while retrieving the item: ${error.message}`,
      );
    }
  }

  async updateOrderItem(
    orderItemId: string,
    dto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    try {
      const orderItem = await this.findOneOrderItem(orderItemId);
      Object.assign(orderItem, dto);
      return this.orderItemRepository.save(orderItem);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurring while updating the item: ${error.message}`,
      );
    }
  }

  async removeOrderItem(orderItemId: string): Promise<OrderItem> {
    try {
      const orderItem = await this.findOneOrderItem(orderItemId);
      const removedOrderItem = await this.orderItemRepository.remove(orderItem);
      await this.orderService.updateOrderTotalPrice(orderItem.order.id);
      return removedOrderItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurring while removing the item: ${error.message}`,
      );
    }
  }
}
