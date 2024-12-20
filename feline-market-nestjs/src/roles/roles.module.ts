import { Module } from '@nestjs/common';
import { Role } from './entities/roles.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, UserRole])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
