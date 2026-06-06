FROM node:22-slim AS deps

WORKDIR /app

# Тулчейн на случай, если для better-sqlite3 нет prebuilt-бинаря под платформу
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci


FROM node:22-slim AS builder

WORKDIR /app

# NEXT_PUBLIC_* вшивается на build, поэтому basePath передаём как build-arg
ARG NEXT_PUBLIC_BASE_PATH=""
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN mkdir -p /app/data

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
