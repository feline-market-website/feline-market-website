import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  logo_url: string;
}
