import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfilesService } from './user-profiles.service';
import { UserProfile } from './entities/user-profile.entity';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() dto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfilesService.createUserProfile(userId, dto);
  }

  @Get(":userId")
  async findOne(@Param("userId") userId: string): Promise<UserProfile> {
    return this.userProfilesService.getUserProfileById(userId)

  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfilesService.updateUserProfile(userId, dto);
  }
}
