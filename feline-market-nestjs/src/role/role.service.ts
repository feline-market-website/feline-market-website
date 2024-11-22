import { CreateRoleDto } from './dto/create-role.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>){}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`)
    }
    return await this.roleRepository.findOneByOrFail({id: id});
  }

  async remove(id: string): Promise<Role> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`)
    }
    const role = await this.roleRepository.findOneByOrFail({id:id})
    return await this.roleRepository.remove(role);
  }
}
