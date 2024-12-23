import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole, UserRoleEnum } from './entities/user-role.entity';
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
      // Check if the role already exists for the user
      const existingUserRole = await this.userRoleRepository.findOne({
        where: { user: { id: dto.user_id }, role: dto.role },
      });

      if (existingUserRole) {
        throw new BadRequestException(
          `User with ID ${dto.user_id} already has the role: ${dto.role}`,
        );
      }

      // If not, create and save the new role
      const userRole = this.userRoleRepository.create({
        user: { id: dto.user_id },
        role: dto.role,
      });

      return this.userRoleRepository.save(userRole);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while assigning role to the user: ${error.message}`,
      );
    }
  }

  async assignDefaultRoleToUser(userId: string): Promise<UserRole> {
    try {
      if (!validate(userId)) {
        throw new BadRequestException('Invalid UUID format');
      }
      const userRole = this.userRoleRepository.create({
        user: { id: userId },
        role: UserRoleEnum.CUSTOMER,
      });
      return this.userRoleRepository.save(userRole);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while set default role to the user: ${error.message}`,
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
        where: { user: { id: dto.user_id }, role: dto.role },
      });
      return this.userRoleRepository.remove(userRole);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while removing role to the user: ${error.message}`,
      );
    }
  }
}
