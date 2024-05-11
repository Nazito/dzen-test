ARG IMAGE_LABEL
ARG BUILD_VERSION
ARG NODE_VERSION=20.11-alpine3.19

FROM node:${NODE_VERSION} as dependencies
LABEL stage="${IMAGE_LABEL}-dependencies"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:${NODE_VERSION} as builder
LABEL stage="${IMAGE_LABEL}-builder"
ENV NODE_ENV=production

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:${NODE_VERSION} as runner
LABEL image-label=${IMAGE_LABEL}
LABEL image-version=${BUILD_VERSION}

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js 
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]
