FROM oven/bun:1 as base
WORKDIR /app

FROM base AS deps

COPY bun.lock package.json turbo.json ./
    
COPY app ./app
    
RUN bun install --frozen-lockfile
    
FROM base AS builder
WORKDIR /app
    
COPY --from=deps /app ./
    
RUN bun run build
    
FROM base AS runner
WORKDIR /app
    
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0
    
COPY --from=deps /app/node_modules ./node_modules
    
COPY --from=builder /app/app/dist ./dist
    
COPY --from=builder /app/app/public ./public

COPY --from=builder /app/app/server.ts ./server.ts
    
EXPOSE 80
    
CMD ["bun", "server.ts"]