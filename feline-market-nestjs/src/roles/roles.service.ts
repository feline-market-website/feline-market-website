import { CreateRoleDto } from './dto/create-roles.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private roleRepository: Repository<Roles>){}

  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll(): Promise<Roles[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: string): Promise<Roles> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`)
    }
    return await this.roleRepository.findOneByOrFail({id: id});
  }

  async remove(id: string): Promise<Roles> {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`)
    }
    const role = await this.roleRepository.findOneByOrFail({id:id})
    return await this.roleRepository.remove(role);
  }
}
