import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  cart_id: string;

  @IsUUID()
  product_id: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  quantity: number;
}
