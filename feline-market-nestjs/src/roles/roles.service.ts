import { CreateRoleDto } from './dto/create-roles.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      return await this.roleRepository.save(createRoleDto);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating a new role:  ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving all roles: ${error.message}`,
      );
    }
  }

  async findOne(id: string): Promise<Role> {
    try {
      if (!validate(id)) {
        throw new BadRequestException(`Invalid UUID format: ${id}`);
      }
      return await this.roleRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving one specific role: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<Role> {
    try {
      if (!validate(id)) {
        throw new BadRequestException(`Invalid UUID format: ${id}`);
      }
      const role = await this.roleRepository.findOneByOrFail({ id: id });
      return await this.roleRepository.remove(role);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while removing a role: ${error.message}`,
      );
    }
  }
}
