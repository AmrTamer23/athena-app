# build stage
FROM oven/bun:1 as build-stage

WORKDIR /app

COPY bun.lock package.json turbo.json ./
COPY app ./app

RUN bun install --frozen-lockfile
RUN bun run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]