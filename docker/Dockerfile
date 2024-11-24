# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install ALL dependencies (including devDependencies)
RUN yarn install --frozen-lockfile

# Copy source files
COPY tsconfig.json ./
COPY src ./src

# Run build
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install ONLY production dependencies
RUN yarn install --frozen-lockfile --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 8000

# Just run start, don't build again
CMD ["yarn", "start"]