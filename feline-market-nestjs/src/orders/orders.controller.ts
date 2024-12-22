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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':userId')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() dto: CreateOrderDto,
  ): Promise<{ message: string; data: Order }> {
    const createdOrder = await this.ordersService.createOrder(dto);
    return { message: 'Order has created successfully', data: createdOrder };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ message: string; data: Order[] }> {
    const orders = await this.ordersService.findAllOrders();
    return { message: 'Orders have retrieved successfully', data: orders };
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('orderId') orderId: string,
  ): Promise<{ message: string; data: Order }> {
    const order = await this.ordersService.findOneOrderById(orderId);
    return { message: 'Order has retrieved successfully', data: order };
  }

  @Patch(':orderId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('orderId') orderId: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<{ message: string; data: Order }> {
    const updatedOrder = await this.ordersService.updateOrder(
      orderId,
      dto,
    );
    return { message: 'Order has updated successfully', data: updatedOrder };
  }

  @Delete(':orderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('orderId') orderId: string,
  ): Promise<{ message: string }> {
    await this.ordersService.removeOrder(orderId);
    return { message: 'Order has removed successfully' };
  }
}
