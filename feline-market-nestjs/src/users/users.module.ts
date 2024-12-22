import { Module } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole, Order])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
