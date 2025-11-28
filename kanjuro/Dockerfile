FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@10.17.1 --activate
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY src/ ./src/
COPY better-auth_migrations/ ./better-auth_migrations/

ENV NODE_ENV=production
EXPOSE 3000
EXPOSE 4200
CMD ["pnpm", "start"]
