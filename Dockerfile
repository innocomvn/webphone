# Multi-stage build for WebPhone

# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy source code
COPY . .

# Copy assets to client public
RUN npm run copy-assets

# Build React app
RUN cd client && npm run build

# Stage 2: Production server
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm install --production

# Copy server code
COPY server ./server

# Copy built React app from build stage
COPY --from=build /app/client/build ./client/build

# Copy SIPml files for backend serving
COPY SIPml-api.js SIPml.js ./
COPY sounds ./sounds
COPY src ./src

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); })"

# Start server
CMD ["node", "server/index.js"]
