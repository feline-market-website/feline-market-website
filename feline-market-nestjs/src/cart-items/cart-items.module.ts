import { Cart } from 'src/carts/entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartItemsController } from './cart-items.controller';
import { CartItemsService } from './cart-items.service';
import { Module } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Cart, Product])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
