import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import {
  BadRequestException,
  Injectable,
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
  }

  async getUserProfileById(userId: string): Promise<UserProfile> {
    if (!validate(userId)) {
      throw new BadRequestException(`Invalid uuid format: ${userId}}`);
    }
    
    return this.userProfileRepository.findOneOrFail({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateUserProfile(
    userId: string,
    dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
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
  }
}
