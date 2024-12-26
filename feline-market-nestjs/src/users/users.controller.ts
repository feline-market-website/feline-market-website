import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED) // status 201
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: User }> {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'User created Successfully',
      data: user,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{ message: string; data: User[] }> {
    const users = await this.usersService.findAll();
    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; data: User }> {
    const user = await this.usersService.findUserWithRoles(id);
    return { message: 'User retrieved successfully', data: user };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; data: User }> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return { message: 'User updated successfully', data: updatedUser };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // status 204
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
