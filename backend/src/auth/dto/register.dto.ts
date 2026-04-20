import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, MinLength } from "class-validator"


export class RegisterDto {
    @ApiProperty({ example: 'Deepak' })
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: 'deepak41125@gmail.com' })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: '041125' })
    @MinLength(6)
    password!: string;

    @ApiProperty({ example: 2 })
    @IsInt()
    roleId!: number;

    @ApiProperty({ example: 'Engineering', required: false })
    @IsOptional()
    department?: string;
}