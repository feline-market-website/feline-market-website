import { IsEnum, IsNumber, IsPositive } from 'class-validator';

import { Optional } from '@nestjs/common';

export class CreateOrderDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total_price: number;

  @Optional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status?: 'Pending' | 'Completed' | 'Cancelled';
}
