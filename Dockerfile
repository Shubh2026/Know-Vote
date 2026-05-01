# ============================================
# BharatVote Guide - Docker Build
# Optimized for Google Cloud Run deployment
# ============================================

# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (production + dev for build)
RUN npm ci --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ============================================
# Stage 2: Serve with nginx (minimal image)
# ============================================
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run uses PORT env variable (default 8080)
ENV PORT=8080
EXPOSE ${PORT}

# Update nginx to use the PORT environment variable
CMD sh -c "sed -i 's/listen 80/listen ${PORT}/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
