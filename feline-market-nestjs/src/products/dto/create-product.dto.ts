import { IsInt, IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateProductDto {
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
