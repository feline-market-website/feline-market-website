import { IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';

import { Optional } from '@nestjs/common';

export class CreateOrderDto {
  @IsUUID()
  user_id: string;
  
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total_price: number;

  @Optional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status?: 'Pending' | 'Completed' | 'Cancelled';
}
