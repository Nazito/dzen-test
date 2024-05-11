# Set image from base on offical node lts alpine
ARG VERSION=lts-alpine
FROM node:$VERSION

# Set label maintainer, version & description
LABEL version="0.1.0"
LABEL description="Unofficial Next.js + Typescript + PWA"
ENV NODE_ENV=production
# Set working directory
WORKDIR /app


COPY --from=builder /app/package.json . 

# Copy all files
COPY . .

# Install dependencies
RUN npm install 
# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000


