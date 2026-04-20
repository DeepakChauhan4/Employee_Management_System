/* eslint-disable */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    // handle optional department: find or create by name
    let departmentId: number | undefined;
    if (dto.department) {
      const dep = await this.prisma.department.findUnique({ where: { name: dto.department } });
      if (dep) {
        departmentId = dep.id;
      } else {
        const created = await this.prisma.department.create({ data: { name: dto.department } });
        departmentId = created.id;
      }
    }

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        roleId: dto.roleId,
        departmentId: departmentId || null,
      },
    });
  }

  async login(dto: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!user.role) {
      throw new NotFoundException("Role not assigned");
    }

    const payload = {
      userId: user.id,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}