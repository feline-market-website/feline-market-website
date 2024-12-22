import { IsUUID, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @IsUUID()
  product_id: string;
  
  @IsUrl()
  image_url: string;
}
