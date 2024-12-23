import {
  IsUUID,
} from 'class-validator';

export class CreateUserProfileDto {
  @IsUUID()
  user_id: string;
}
