import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { validate } from 'uuid';
import { Role } from 'src/roles/entities/roles.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { username, email, password } = createUserDto;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.usersRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await this.usersRepository.save(user);

      // Find "Customer" role
      const customerRole = await this.roleRepository.findOne({
        where: { name: 'customer' },
      });

      if (!customerRole) {
        throw new InternalServerErrorException('Customer role not found');
      }

      // Create UserRole
      const userRole = this.userRoleRepository.create({
        user: savedUser,
        role: customerRole,
      });

      await this.userRoleRepository.save(userRole);

      return savedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating the user: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find({ relations: ['roles.role'] });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurring while find all users: ${error.message}`,
      );
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      if (!validate(id)) {
        throw new BadRequestException(`Invalid UUID format: ${id}`);
      }

      return this.usersRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurring while find one the user: ${error.message}`,
      );
    }
  }

  async findUserWithRoles(id: string): Promise<User> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    try {
      return this.usersRepository.findOneOrFail({
        where: { id },
        relations: ['roles.role'],
      });
    } catch (error) {
      throw new NotFoundException(
        `An error occurred while get the user with role: ${error.message} `,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    const user = await this.usersRepository.findOneByOrFail({ id });
    const updatedUser = Object.assign(user, updateUserDto);

    try {
      return await this.usersRepository.save(updatedUser);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while updating the user: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    const user = await this.usersRepository.findOneByOrFail({ id: id });

    try {
      await this.usersRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while deleting the user: ${error.message}`,
      );
    }
  }
}
