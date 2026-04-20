import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) { }

    async getReply(message: string) {
        const msg = message.toLowerCase();

        if (msg.includes('hii') || msg.includes('hello') || msg.includes('hey')) {
            return { reply: "Hello! How can I help you today?" };
        }

        // 🔹 TOTAL USERS
        if (msg.includes('total users') || msg.includes('total employee')) {
            const count = await this.prisma.user.count();
            return { reply: `There are ${count} users.` };
        }

        // 🔹 USERS BY DEPARTMENT
        if (msg.includes('it')) {
            const count = await this.prisma.user.count({
                where: {
                    department: {
                        name: 'IT',
                    },
                },
            });

            return { reply: `There are ${count} users in IT.` };
        }

        // 🔹 USERS BY ROLE
        if (msg.includes('admin')) {
            const count = await this.prisma.user.count({
                where: {
                    role: {
                        name: 'ADMIN',
                    },
                },
            });

            return { reply: `There are ${count} admins.` };
        }

        return { reply: "Sorry, I don't understand." };
    }
}