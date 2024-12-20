import { IsPhoneNumber, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateUserProfileDto {
    
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
