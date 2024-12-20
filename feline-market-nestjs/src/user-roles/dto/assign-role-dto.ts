import { IsUUID } from "class-validator";

export class AssignRoleDto {
    @IsUUID()
    user_id: string;

    @IsUUID()
    role_id: string;
}