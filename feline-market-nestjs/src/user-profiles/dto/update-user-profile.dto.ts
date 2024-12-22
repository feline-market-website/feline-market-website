import {
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CreateUserProfileDto } from './create-user-profile.dto';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  @Optional()
  first_name: string;

  @IsString()
  @MaxLength(50)
  @MinLength(2)
  @Optional()
  last_name: string;

  @IsUrl()
  @Optional()
  avatar_url: string;

  @IsPhoneNumber()
  @Optional()
  phone_number: string;

  @IsString()
  @Optional()
  shipping_address: string;
}
