/* eslint-disable */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }


    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                role: true, // include role details
            },
        });
    }

    findAll() {
        // @ts-ignore
        return this.prisma.user.findMany({
            include: { role: true },
        });
    }

    async create(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
            },
        });
    }
}