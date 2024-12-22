import { IsInt, IsNumber, IsPositive } from 'class-validator';

import { CreateOrderItemDto } from './create-order-item.dto';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @IsInt()
  @IsPositive()
  @Optional()
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Optional()
  price: number;
}
