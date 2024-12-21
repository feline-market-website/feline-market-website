import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UserRolesService } from './user-roles.service';
import { AssignRoleDto } from './dto/assign-role-dto';
import { UserRole } from './entities/user-role.entity';
import { RemoveRoleDto } from './dto/remove-role-dto';
import { RolesService } from 'src/roles/roles.service';

@Controller('user-roles')
export class UserRolesController {
  constructor(
    private readonly userRolesService: UserRolesService,
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async assignRole(
    @Body() assignRoleDto: AssignRoleDto,
  ): Promise<{ message: string; data: UserRole }> {
    const response =
      await this.userRolesService.assignRoleToUser(assignRoleDto);
    const role = await this.rolesService.findOne(assignRoleDto.role_id);
    return {
      message: `Assigned role ${role.name} to the user successfully`,
      data: response,
    };
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeRole(
    @Body() removeRoleDto: RemoveRoleDto,
  ): Promise<{ message: string }> {
    await this.userRolesService.removeRoleFromUser(removeRoleDto);
    const role = await this.rolesService.findOne(removeRoleDto.role_id);
    return { message: `Removed role ${role.name} for the user successfully` };
  }
}
