import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
