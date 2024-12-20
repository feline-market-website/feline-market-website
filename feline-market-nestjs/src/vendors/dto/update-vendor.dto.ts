import { IsString, IsUrl, Length } from 'class-validator';

import { CreateVendorDto } from './create-vendor.dto';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVendorDto extends PartialType(CreateVendorDto) {
  @IsString()
  @Length(5, 50)
  @Optional()
  name: string;

  @IsString()
  @Optional()
  description: string;

  @IsUrl()
  @Optional()
  logo_url: string;
}
