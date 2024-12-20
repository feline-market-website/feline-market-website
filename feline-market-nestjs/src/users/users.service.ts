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
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { username, email, password } = createUserDto;
  
      // Step 1: Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Step 2: Create the user
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hashedPassword;
  
      const savedUser = await this.usersRepository.save(user);
  
      // Step 3: Find the "Customer" role
      const customerRole = await this.roleRepository.findOne({
        where: { name: 'customer' },
      });
  
      if (!customerRole) {
        throw new InternalServerErrorException('Customer role not found');
      }
  
      // Step 4: Create UserRole
      const userRole = this.userRoleRepository.create({
        user: savedUser,
        role: customerRole,
      });
  
      // Step 5: Save UserRole
      await this.userRoleRepository.save(userRole);
  
      return savedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `An unexpected error occurred: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    return await this.usersRepository.findOneByOrFail({ id: id });
  }

  async findUserWithRoles(id: string): Promise<any> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
        relations: ['roles', 'roles.role'],
      });
  
      // Transform roles into a simple array of role names
      return {
        ...user,
        roles: user.roles.map(userRole => userRole.role.name),
      };
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found: ${error}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    const user = await this.usersRepository.findOneByOrFail({ id: id });
    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: string): Promise<User> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    const user = await this.usersRepository.findOneByOrFail({ id: id });
    return await this.usersRepository.remove(user);
  }
}
