# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# 🔑 REQUIRED for Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine

WORKDIR /app

# 🔑 REQUIRED for Prisma and native modules (bcrypt) at runtime
RUN apk add --no-cache openssl python3 make g++

COPY package*.json ./
# Install production deps (allow scripts so bcrypt builds)
RUN npm install --omit=dev

# Ensure bcrypt native binding is built for alpine
RUN npm rebuild bcrypt --build-from-source

# Copy Prisma schema before generating client
COPY --from=builder /app/prisma ./prisma
# Generate Prisma client (needed at runtime, no DB connection required)
RUN npx prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main.js"]
    