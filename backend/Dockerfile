FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package.json (for prod deps)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Generate Prisma client for prod
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

# Copy built app
COPY --from=builder /app/dist ./dist

# Copy Prisma migrations
COPY --from=builder /app/prisma/migrations ./prisma/migrations

# Copy scripts if needed
COPY --from=builder /app/scripts ./scripts

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy uploads (will be mounted as volume)
COPY uploads ./uploads

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

CMD ["node", "dist/main.js"]

