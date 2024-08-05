FROM node:21-bullseye-slim as base

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  tini \
  && rm -rf /var/lib/apt/lists/*
RUN npm i -g pnpm@9.6.0
EXPOSE 5000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm i && pnpm store prune

FROM base as source

COPY --chown=node:node . .

FROM source as production
RUN pnpm build
ENV NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH
RUN pnpm i && pnpm store prune
RUN pnpm prisma generate
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "./dist/server.js"]
