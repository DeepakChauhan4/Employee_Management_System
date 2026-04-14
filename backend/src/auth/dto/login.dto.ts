import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto {

    @ApiProperty({ example: 'deepak41125@gmail.com' })
    @IsEmail()
    email!: string;


    @ApiProperty({ example: '041125' })
    @IsNotEmpty()
    password!: string;
}