/* eslint-disable */

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Param, Patch, Delete } from '@nestjs/common';
import { Get as GetParam } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  //ADMIN ONLY
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get All Users' })
  getAllUsers() {
    return this.userService.findAll();
  }

  //UPDATED PROFILE API
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Req() req: any) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid token: userId missing');
    }

    return this.userService.findById(Number(userId));
  }

  @Get('stats')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  async getStats() {
    try {
      return await this.userService.getUserStats();
    } catch (err) {
      console.error('getStats error:', err);
      throw err;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  getUserById(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + extname(file.originalname);
          cb(null, unique);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any, @Req() req: any) {
    return this.userService.updateProfileImage(req.user.userId, file.filename);
  }

  // ADMIN: update user (e.g., department, role, name)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  async updateUser(@Param('id') id: string, @Body() dto: any) {
    const userId = Number(id);

    // handle department by name if provided
    if (dto.department) {
      const dep = await this.userService['prisma'].department.findUnique({ where: { name: dto.department } });
      if (dep) {
        dto.departmentId = dep.id;
      } else {
        const created = await this.userService['prisma'].department.create({ data: { name: dto.department } });
        dto.departmentId = created.id;
      }
      delete dto.department;
    }

    return this.userService.update(userId, dto);
  }

  //ADMIN: delete user
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  removeUser(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}