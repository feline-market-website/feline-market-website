import { IsInt, IsNumber, IsPositive, IsString, IsUUID, Length } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  vendor_id: string;
  
  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;
}
