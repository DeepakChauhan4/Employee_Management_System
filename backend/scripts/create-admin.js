const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
    const prisma = new PrismaClient();
    try {
        // ensure ADMIN role exists
        let adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
        if (!adminRole) {
            adminRole = await prisma.role.create({ data: { name: 'ADMIN' } });
            console.log('Created ADMIN role');
        }

        const email = 'admin@example.com';
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            console.log('Admin user already exists:', email);
            return;
        }

        const hashed = await bcrypt.hash('password', 10);
        const user = await prisma.user.create({
            data: {
                name: 'Admin',
                email,
                password: hashed,
                roleId: adminRole.id,
            },
        });

        console.log('Created admin user:', user.email);
    } catch (err) {
        console.error(err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
