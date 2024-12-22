import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() dto: CreateOrderItemDto,
  ): Promise<{ message: string; data: OrderItem }> {
    const orderItem = await this.orderItemsService.addItemToOrder(dto);
    return { message: 'Order item has created successfully', data: orderItem };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ message: string; data: OrderItem[] }> {
    const orderItems = await this.orderItemsService.findAllOrderItems();
    return {
      message: 'Order items have retrieved successfully',
      data: orderItems,
    };
  }

  @Get(':orderItemId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('orderItemId') orderItemId: string,
  ): Promise<{ message: string; data: OrderItem }> {
    const orderItem =
      await this.orderItemsService.findOneOrderItem(orderItemId);
    return {
      message: 'Order item has retrieved successfully',
      data: orderItem,
    };
  }

  @Patch(':orderItemId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('orderItemId') orderItemId: string,
    @Body() dto: UpdateOrderItemDto,
  ): Promise<{ message: string; data: OrderItem }> {
    const orderItem = await this.orderItemsService.updateOrderItem(
      orderItemId,
      dto,
    );
    return { message: 'Order item has updated successfully', data: orderItem };
  }

  @Delete(':orderItemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('orderItemId') orderItemId: string,
  ): Promise<{ message: string }> {
    await this.orderItemsService.removeOrderItem(orderItemId);
    return { message: 'Order item has removed successfully' };
  }
}
