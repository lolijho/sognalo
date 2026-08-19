FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Rimuove le devDependencies: lo stage production riusa questi node_modules,
# così l'intera build esegue un solo npm ci (niente install paralleli).
RUN npm prune --omit=dev

FROM node:22-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY server.js .

EXPOSE 3000

# Forma shell (non exec) così ${PORT} viene espansa: Coolify imposta PORT=80,
# in locale il default è 3000 — l'healthcheck segue la porta effettiva.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider "http://127.0.0.1:${PORT:-3000}/" || exit 1

CMD ["node", "server.js"]
