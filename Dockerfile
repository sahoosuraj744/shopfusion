# === Backend Stage ===
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy backend source
COPY backend/ .

# Expose backend port
EXPOSE 4000

# === Frontend Stage ===
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy frontend source
COPY frontend/ .

# Build frontend
RUN npm run build

# === Production Backend Stage ===
FROM node:20-alpine AS backend-runtime
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy built backend from builder
COPY --from=backend-builder /app/backend /app/backend
WORKDIR /app/backend

# Set ownership to nodejs user
RUN chown -R nodejs:nodejs /app/backend

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 4000

CMD ["npm", "start"]
