import { Body, Controller, Get, Param,Post } from '@nestjs/common';

import { UserRolesService } from './user-roles.service';
import { AssignRoleDto } from './dto/assign-role-dto';
import { UserRole } from './entities/user-role.entity';
import { RemoveRoleDto } from './dto/remove-role-dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  async assignRole(@Body() assignRoleDto: AssignRoleDto): Promise<UserRole> {
    return this.userRolesService.assignRoleToUser(assignRoleDto);
  }

  @Get(':userId')
  async getUserRole(@Param('userId') userId: string): Promise<UserRole[]> {
    return this.userRolesService.getRoleForUser(userId);
  }

  @Post()
  async removeRole(@Body() removeRoleDto: RemoveRoleDto): Promise<UserRole> {
    return this.userRolesService.removeRoleFromUser(removeRoleDto);
  }
}
