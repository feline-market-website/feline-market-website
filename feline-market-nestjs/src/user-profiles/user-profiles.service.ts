import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { User } from 'src/users/entities/user.entity';
import { validate } from 'uuid';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUserProfile(
    userId: string,
    dto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    try {
      const user = await this.userRepository.findOneByOrFail({
        id: userId,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const userProfile = this.userProfileRepository.create({
        ...dto,
        user,
      });
      return this.userProfileRepository.save(userProfile);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating user profile: ${error.message}`,
      );
    }
  }

  async getUserProfileById(userId: string): Promise<UserProfile> {
    try {
      if (!validate(userId)) {
        throw new BadRequestException(`Invalid uuid format: ${userId}}`);
      }

      return this.userProfileRepository.findOneOrFail({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving user profile by id: ${error.message}`,
      );
    }
  }

  async updateUserProfile(
    userId: string,
    dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    try {
      if (!validate(userId)) {
        throw new BadRequestException(`Invalid uuid format: ${userId}}`);
      }
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const userProfile = await this.getUserProfileById(userId);
      Object.assign(userProfile, dto);
      return this.userProfileRepository.save(userProfile);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while updating user profile: ${error.message}`,
      );
    }
  }
}
