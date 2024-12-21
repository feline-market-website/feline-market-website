import { Module } from '@nestjs/common';
import { Role } from 'src/roles/entities/roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User, Role])],
  controllers: [UserRolesController],
  providers: [UserRolesService, RolesService],
})
export class UserRolesModule {}
