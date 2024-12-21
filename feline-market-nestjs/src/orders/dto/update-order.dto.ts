import { IsEnum, IsNumber, IsPositive } from 'class-validator';

import { CreateOrderDto } from './create-order.dto';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Optional()
  total_price: number;

  @Optional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status?: 'Pending' | 'Completed' | 'Cancelled';
}
