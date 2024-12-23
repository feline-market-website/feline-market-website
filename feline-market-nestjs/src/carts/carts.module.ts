import { Cart } from './entities/cart.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
