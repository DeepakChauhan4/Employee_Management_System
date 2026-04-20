/* eslint-disable */

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('register')
  @ApiOperation({ summary: "Register User" })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 🔥 STRICT LIMIT
  @Post('login')
  @ApiOperation({ summary: "Login User" })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}