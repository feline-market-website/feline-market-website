import { Module } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { OrdersService } from 'src/orders/orders.service';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, User])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrdersService],
})
export class OrderItemsModule {}
