import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'Role name must be most 50 character long' })
  readonly name: string;

  @IsString()
  @MaxLength(100, { message: 'Description must be most 100 character long' })
  readonly description: string;
}
