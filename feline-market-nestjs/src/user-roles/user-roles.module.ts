import { Module } from '@nestjs/common';
import { Role } from 'src/roles/entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User, Role])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
