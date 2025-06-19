FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


COPY . .

RUN pnpm build

FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/.output ./.output

ENV HOST=0.0.0.0
EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]