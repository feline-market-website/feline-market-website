import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';


@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>
  ){}
  async addItemToOrder(dto: CreateOrderItemDto): Promise<OrderItem> {
    try {
      const orderItem = this.orderItemRepository.create({
        order: {id: dto.order_id},
        product: {id: dto.product_id},
        quantity: dto.quantity,
        price: dto.price,
      })
      return this.orderItemRepository.save(orderItem)
    } catch (error) {
      throw new InternalServerErrorException(`An error occurring while adding item to the order: ${error.message}`)
    }
  }

  async findAllOrderItems(): Promise<OrderItem[]> {
    try {
      return this.orderItemRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(`An error occurring while retrieving all items: ${error.message}`)
    }
  }

  async findOneOrderItem(orderItemId: string): Promise<OrderItem> {
    try {
      if (!validate(orderItemId)) {
        throw new BadRequestException(`Invalid UUID format`)
      }
      return this.orderItemRepository.findOneOrFail({where: {id: orderItemId}})
    } catch (error) {
      throw new InternalServerErrorException(`An error occurring while retrieving the item: ${error.message}`)
    }
  }

  async updateOrderItem(orderItemId: string, dto: UpdateOrderItemDto): Promise<OrderItem> {
    try {
      const orderItem = await this.findOneOrderItem(orderItemId);
      Object.assign(orderItem, dto)
      return this.orderItemRepository.save(orderItem);
    } catch (error) {
      throw new InternalServerErrorException(`An error occurring while updating the item: ${error.message}`)
    };
  }

  async removeOrderItem(orderItemId: string): Promise<OrderItem> {
    try {
      const orderItem = await this.findOneOrderItem(orderItemId);
      return this.orderItemRepository.remove(orderItem)
    } catch (error) {
      throw new InternalServerErrorException(`An error occurring while removing the item: ${error.message}`)
    }
  }
}
