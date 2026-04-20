const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany({ select: { createdAt: true } });
        console.log('Users count:', users.length);
        const stats = {};
        users.forEach(u => {
            const date = new Date(u.createdAt).toLocaleDateString();
            stats[date] = (stats[date] || 0) + 1;
        });
        console.log('Stats:', Object.keys(stats).map(d => ({ name: d, users: stats[d] })));
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
