import { defineConfig, env } from '@prisma/config'; // Make sure env is imported
import 'dotenv/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Use Prisma's env() function instead of process.env
    url: env('DATABASE_URL'),
  },
});