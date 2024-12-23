import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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

  async createUserProfile(dto: CreateUserProfileDto): Promise<UserProfile> {
    try {
      const user = await this.userRepository.findOneByOrFail({
        id: dto.user_id,
      });
      const userProfile = this.userProfileRepository.create({
        user,
      });
      return this.userProfileRepository.save(userProfile);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating user profile: ${error.message}`,
      );
    }
  }

  async getUserProfileById(userProfileId: string): Promise<UserProfile> {
    try {
      if (!validate(userProfileId)) {
        throw new BadRequestException(`Invalid UUID format`);
      }

      return this.userProfileRepository.findOneOrFail({
        where: { id: userProfileId },
        relations: ['user'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while retrieving user profile by id: ${error.message}`,
      );
    }
  }

  async updateUserProfile(
    userProfileId: string,
    dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    try {
      if (!validate(userProfileId)) {
        throw new BadRequestException(`Invalid uuid format: ${userProfileId}}`);
      }
      const userProfile = await this.getUserProfileById(userProfileId);
      Object.assign(userProfile, dto);
      return this.userProfileRepository.save(userProfile);
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while updating user profile: ${error.message}`,
      );
    }
  }
}
