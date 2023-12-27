import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly account_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string;
}

export class LoginUserDTO {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class UpdateUserDTO {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;
}
