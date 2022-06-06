FROM node:16-alpine

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.js ./next.config.js



CMD ["npm", "run", "dev"]