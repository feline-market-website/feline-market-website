import { IsString, IsUUID, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateVendorDto {
  @IsUUID()
  user_id: string;

  @IsString()
  @MaxLength(50)
  @MinLength(5)
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  logo_url: string;
}
