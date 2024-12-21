import { IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @IsUrl()
  image_url: string;
}
