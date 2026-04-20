/* eslint-disable */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }


    async findById(id: number) {
        console.log('findById called with id:', id);
        if (id === undefined || id === null || Number.isNaN(Number(id))) {
            console.error('findById received invalid id:', id);
            throw new Error('Invalid id provided to findById');
        }

        return this.prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                role: true, // include role details
                department: true,
            },
        });
    }

    findAll() {
        // @ts-ignore
        return this.prisma.user.findMany({
            include: { role: true, department: true },
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
    async getUserStats() {
        const users = await this.prisma.user.findMany({
            select: { createdAt: true },
        });

        const stats: Record<string, number> = {};

        users.forEach((user) => {
            const date = new Date(user.createdAt).toLocaleDateString();

            stats[date] = (stats[date] || 0) + 1;
        });

        return Object.keys(stats).map((date) => ({
            name: date,
            users: stats[date],
        }));
    }

    async updateProfileImage(userId: number, filename: string) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                // @ts-ignore
                profileImage: filename,
            },
        });
    }

    async update(userId: number, data: any) {
        return this.prisma.user.update({
            where: { id: userId },
            data,
        });
    }

    async remove(userId: number) {
        return this.prisma.user.delete({ where: { id: userId } });
    }
}