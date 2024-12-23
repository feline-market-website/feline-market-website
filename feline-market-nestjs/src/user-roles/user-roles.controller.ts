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

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async assignRole(
    @Body() assignRoleDto: AssignRoleDto,
  ): Promise<{ message: string; data: UserRole }> {
    const response =
      await this.userRolesService.assignRoleToUser(assignRoleDto);
    return {
      message: `Assigned role to the user successfully`,
      data: response,
    };
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeRole(
    @Body() removeRoleDto: RemoveRoleDto,
  ): Promise<{ message: string }> {
    await this.userRolesService.removeRoleFromUser(removeRoleDto);
    return { message: `Removed role for the user successfully` };
  }
}
