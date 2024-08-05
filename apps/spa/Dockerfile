FROM node:21-bullseye-slim as base

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  tini \
  && rm -rf /var/lib/apt/lists/*
RUN npm i -g pnpm@9.6.0
EXPOSE 3000
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
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["pnpm", "preview"]



# FROM node:21 as dependencies

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./
# RUN npm install --package-lock-only
# RUN npm ci

# FROM node:21 as builder
# WORKDIR /usr/src/app
# COPY . .
# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# RUN npm run build

# FROM node:lts as runner

# WORKDIR /usr/src/app

# ENV NODE_ENV production
# # If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /usr/src/app/next.config.mjs ./next.config.mjs
# COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/.next ./.next
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package.json ./package.json

# EXPOSE 3002

# CMD ["npm", "run", "start"]