import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';
import { AssignRoleDto } from './dto/assign-role-dto';
import {validate} from 'uuid'
import { RemoveRoleDto } from './dto/remove-role-dto';


@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async assignRoleToUser(dto: AssignRoleDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create({user: {id: dto.user_id}, role: {id: dto.role_id}})
    return this.userRoleRepository.save(userRole);
  }

  async getRoleForUser(userId: string): Promise<UserRole[]> {
    if (!validate(userId)) {
      throw new BadRequestException(`Invalid UUID format: ${userId}`);
    }
    return this.userRoleRepository.find({
      where: {user: {id: userId}},
      relations: ['roles'],
    });
  }

  async removeRoleFromUser(dto: RemoveRoleDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create({user: {id: dto.user_id}, role: {id: dto.role_id}})
    return this.userRoleRepository.remove(userRole);
  }
}
