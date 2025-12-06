FROM node:lts-alpine AS base

RUN apk add --no-cache curl unzip bash && \
    curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun && \
    chmod +x /usr/local/bin/bun

WORKDIR /app

FROM base AS deps

COPY package.json bun.lock ./
COPY app/package.json ./app/package.json

RUN bun install --frozen-lockfile

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules

COPY --from=builder /app/app/dist ./dist
COPY --from=builder /app/app/public ./public

USER nextjs

EXPOSE 80   

ENV PORT=80
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "run", "dist/server.js"]