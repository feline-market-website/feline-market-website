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
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { CartsService } from 'src/carts/carts.service';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { UserRolesService } from 'src/user-roles/user-roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly cartsService: CartsService,
    private readonly userProfilesService: UserProfilesService,
    private readonly userRolesService: UserRolesService,
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

      // Set default role: "customer"
      await this.userRolesService.assignDefaultRoleToUser(savedUser.id);
      // Create User Profile to user
      await this.userProfilesService.createUserProfile({
        user_id: savedUser.id,
      });
      // Create Cart to user
      await this.cartsService.createCart({ user_id: savedUser.id });

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

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username: username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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
    // Validate UUID format
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    // Find the user by ID or throw an exception
    const user = await this.usersRepository.findOneByOrFail({ id });

    try {
      // Check if a new password is provided and hash it
      let hashedPassword: string | undefined;
      if (updateUserDto.password) {
        hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Merge the existing user data with the updates
      const updatedData = {
        ...updateUserDto,
        ...(hashedPassword && { password: hashedPassword }), // Only include hashed password if provided
      };

      const updatedUser = Object.assign(user, updatedData);

      // Save the updated user to the database
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
