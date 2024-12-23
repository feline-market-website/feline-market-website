import { IsEnum, IsUUID } from 'class-validator';

import { Optional } from '@nestjs/common';
import { UserRoleEnum } from '../entities/user-role.entity';

export class RemoveRoleDto {
  @IsUUID()
  user_id: string;

  @IsEnum(UserRoleEnum)
  @Optional()
  role: UserRoleEnum;
}
