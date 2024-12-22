import { IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  user_id: string;
}
