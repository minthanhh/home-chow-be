import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignUpDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}
