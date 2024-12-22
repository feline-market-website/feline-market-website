import { IsPhoneNumber, IsString, IsUUID, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateUserProfileDto {
    @IsUUID()
    user_id: string;
    
    @IsString()
    @MaxLength(50)
    @MinLength(2)
    first_name: string;

    @IsString()
    @MaxLength(50)
    @MinLength(2)
    last_name: string;

    @IsUrl()
    avatar_url: string;
    
    @IsPhoneNumber()
    phone_number: string;

    @IsString()
    shipping_address: string;
    
}
