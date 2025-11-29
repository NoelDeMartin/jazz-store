# Jazz Store

This is the source code for my self-hosted [Jazz Sync Server](https://jazz.tools).

You'll notice that it's very simple. It just consists of a bare bones [Fastify](https://fastify.dev) server for a [Better Auth](https://www.better-auth.com/) backend, and the [`jazz-run` cli](https://jazz.tools/docs/react/core-concepts/sync-and-storage#self-hosting-your-sync-server).

## Development

You can try this yourself in your machine running the following commands:

```sh
pnpm install
pnpm prepare
pnpm start
```

## Production

In production, I'm using [kanjuro](https://github.com/NoelDeMartin/kanjuro) and [nginx-agora](https://github.com/NoelDeMartin/nginx-agora) to deploy this site with Docker:

```bash
git clone https://github.com/NoelDeMartin/jazz-store.git --branch kanjuro --single-branch
cd jazz-store
kanjuro install
kanjuro start
kanjuro compose exec app pnpm prepare
nginx-agora start
```
