import { IsInt, IsNumber, IsPositive, IsString, Length } from 'class-validator';

import { CreateProductDto } from './create-product.dto';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @Length(5, 100)
  @Optional()
  name: string;

  @IsString()
  @Optional()
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Optional()
  price: number;

  @IsInt()
  @IsPositive()
  @Optional()
  stock: number;
}
