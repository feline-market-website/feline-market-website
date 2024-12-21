import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async create(
    @Param('userId') userId: string,
    @Body() dto: CreateUserProfileDto,
  ): Promise<{ message: string; data: UserProfile }> {
    const userProfile = await this.userProfilesService.createUserProfile(
      userId,
      dto,
    );
    return {
      message: `User Profile has created successfully`,
      data: userProfile,
    };
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('userId') userId: string,
  ): Promise<{ message: string; data: UserProfile }> {
    const userProfile =
      await this.userProfilesService.getUserProfileById(userId);
    return {
      message: `User profile has retrieved successfully`,
      data: userProfile,
    };
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<{ message: string; data: UserProfile }> {
    const updatedUserProfile = await this.userProfilesService.updateUserProfile(
      userId,
      dto,
    );
    return {
      message: `User has updated successfully`,
      data: updatedUserProfile,
    };
  }
}
