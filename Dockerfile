FROM oven/bun:1 as base
WORKDIR /app

FROM base AS deps

COPY bun.lock package.json turbo.json ./
    
COPY app ./app
COPY packages ./packages
    
RUN bun install --frozen-lockfile
    
FROM base AS builder
WORKDIR /app
    
COPY --from=deps /app ./
    
RUN bun run build
    
FROM base AS runner
WORKDIR /app
    
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
    
COPY --from=builder /app/app/.next/standalone ./
    
COPY --from=builder /app/app/.next/static ./app/.next/static
    
COPY --from=builder /app/app/public ./app/public
    
EXPOSE 3000
    
CMD ["bun", "server.js"]