# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs sedov

COPY --from=builder --chown=sedov:nodejs /app/package.json /app/package-lock.json ./
COPY --from=builder --chown=sedov:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=sedov:nodejs /app/dist ./dist

USER sedov

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0", "--port", "3000"]
