/* eslint-disable */

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  // 👑 ADMIN ONLY
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get All Users' })
  getAllUsers() {
    return this.userService.findAll();
  }

  // 🔥 UPDATED PROFILE API
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Req() req: any) {
    const userId = req.user.userId; // from JWT
    return this.userService.findById(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}