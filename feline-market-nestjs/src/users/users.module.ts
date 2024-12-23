import { Cart } from 'src/carts/entities/cart.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { CartItemsService } from 'src/cart-items/cart-items.service';
import { CartsService } from 'src/carts/carts.service';
import { Module } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      UserRole,
      Order,
      UserProfile,
      CartItem,
      Cart,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRolesService,
    UserProfilesService,
    CartItemsService,
    CartsService,
  ],
})
export class UsersModule {}
