# Frontend Dockerfile with multi-stage build
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install && npm cache clean --force

# Copy frontend source
COPY frontend/ .

# Build the application
RUN npm run build

# === Production Stage ===
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built frontend from builder
COPY --from=frontend-builder /app/dist .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx-user && adduser -S nginx-user -u 1001

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
