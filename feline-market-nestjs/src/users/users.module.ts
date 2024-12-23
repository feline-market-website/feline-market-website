import { CartItemsService } from 'src/cart-items/cart-items.service';
import { Module } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole, Order])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRolesService,
    UserProfilesService,
    CartItemsService,
  ],
})
export class UsersModule {}
