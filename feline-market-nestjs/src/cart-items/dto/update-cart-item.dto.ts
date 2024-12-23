import { IsNumber, IsPositive } from 'class-validator';

import { CreateCartItemDto } from './create-cart-item.dto';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Optional()
  quantity?: number;
}
