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

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() dto: CreateUserProfileDto,
  ): Promise<{ message: string; data: UserProfile }> {
    const userProfile = await this.userProfilesService.createUserProfile(dto);
    return {
      message: `User Profile has created successfully`,
      data: userProfile,
    };
  }

  @Get(':userProfileId')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('userProfileId') userProfileId: string,
  ): Promise<{ message: string; data: UserProfile }> {
    const userProfile =
      await this.userProfilesService.getUserProfileById(userProfileId);
    return {
      message: `User profile has retrieved successfully`,
      data: userProfile,
    };
  }

  @Patch(':userProfileId')
  async update(
    @Param('userProfileId') userProfileId: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<{ message: string; data: UserProfile }> {
    const updatedUserProfile = await this.userProfilesService.updateUserProfile(
      userProfileId,
      dto,
    );
    return {
      message: `User has updated successfully`,
      data: updatedUserProfile,
    };
  }
}
