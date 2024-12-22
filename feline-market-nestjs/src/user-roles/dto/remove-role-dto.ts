import { IsUUID } from 'class-validator';

export class RemoveRoleDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  role_id: string;
}
