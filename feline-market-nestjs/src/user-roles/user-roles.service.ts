import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';
import { AssignRoleDto } from './dto/assign-role-dto';
import { validate } from 'uuid';
import { RemoveRoleDto } from './dto/remove-role-dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async assignRoleToUser(dto: AssignRoleDto): Promise<UserRole> {
    try {
      const userRole = this.userRoleRepository.create({
        user: { id: dto.user_id },
        role: { id: dto.role_id },
      });
      return this.userRoleRepository.save(userRole);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while assigning role to the user: ${error.message}`,
      );
    }
  }

  async getRoleForUser(userId: string): Promise<UserRole[]> {
    try {
      if (!validate(userId)) {
        throw new BadRequestException(`Invalid UUID format: ${userId}`);
      }
      return this.userRoleRepository.find({
        where: { user: { id: userId } },
        relations: ['roles'],
      });
    } catch (error) {
      throw new NotFoundException(
        `UserRole for userId Not Found: ${error.message}`,
      );
    }
  }

  async removeRoleFromUser(dto: RemoveRoleDto): Promise<UserRole> {
    try {
      const userRole = await this.userRoleRepository.findOneOrFail({
        where: { user: { id: dto.user_id }, role: { id: dto.role_id } },
        relations: ['role', 'user'],
      });
      return this.userRoleRepository.remove(userRole);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while removing role to the user: ${error.message}`,
      );
    }
  }
}
