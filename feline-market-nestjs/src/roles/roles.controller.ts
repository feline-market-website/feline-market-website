import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-roles.dto';
import { Role } from './entities/roles.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<{ message: string; data: Role }> {
    const role = await this.roleService.create(createRoleDto);
    return {
      message: `Role ${role.name} has created successfully`,
      data: role,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ message: string; data: Role[] }> {
    const roles = await this.roleService.findAll();
    return { message: `Roles have retrieved successfully`, data: roles };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Role }> {
    const role = await this.roleService.findOne(id);
    return { message: `Role has retrieved successfully`, data: role };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.roleService.remove(id);
    return { message: `Role removed successfully` };
  }
}
