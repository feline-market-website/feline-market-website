import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { validate } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { username, email, password } = createUserDto;

      // Hash password event process in this section.
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hashedPassword;

      return await this.usersRepository.save(user);
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
    
    return await this.usersRepository.findOneByOrFail({id:id});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    const user = await this.usersRepository.findOneByOrFail({id:id});
    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: string): Promise<User> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }

    const user = await this.usersRepository.findOneByOrFail({id:id})
    return await this.usersRepository.remove(user);
  }
}
