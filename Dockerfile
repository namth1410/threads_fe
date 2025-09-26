# Stage 1: Build app
FROM node:22.14.0 AS build

WORKDIR /app

# Copy package files và cài deps
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy source code
COPY ./src ./src
COPY ./public ./public
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY index.html ./

# Build production
RUN npm run build

# Stage 2: Serve bằng nginx unprivileged
FROM nginxinc/nginx-unprivileged:stable-alpine3.19-slim

# Copy build output từ dist (Vite) -> nginx html
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html

COPY ./rootfs /
# Expose port 8080 (nginx unprivileged dùng 8080 thay vì 80)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
