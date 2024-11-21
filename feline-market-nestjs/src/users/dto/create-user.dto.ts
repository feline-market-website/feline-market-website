import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MaxLength(50, {message: "User name must be at most 50 letters long."})
    readonly username: string;

    @IsEmail()
    @MaxLength(100, {message: "Email must be at most 100 letters long."})
    readonly email: string;

    @IsString()
    @MaxLength(255, {message: "Password must be at most 255 letters long."})
    @MinLength(12, {message: "Password must be at least 12 letter long."})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
        message: 'Password must contain at least one letter and one number.'
    })
    readonly password: string;
}
