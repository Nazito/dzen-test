# Set base image from the official Node.js LTS Alpine repository
ARG VERSION=lts-alpine
FROM node:$VERSION as builder

# Set label maintainer, version & description
LABEL version="0.1.0"
LABEL description="Unofficial Next.js + Typescript + PWA"
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Build app
RUN npm run build

# Second stage for copying necessary files
FROM node:$VERSION

# Set working directory
WORKDIR /app

# Copy package.json and next.config.js from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./

# Copy built files
COPY --from=builder /app/.next ./

# Expose the listening port
EXPOSE 3000
