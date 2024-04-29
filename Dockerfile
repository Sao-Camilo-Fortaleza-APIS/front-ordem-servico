# Description: Dockerfile to build the frontend of the application

# Base image
FROM node:20 as base
FROM base AS dependencies
WORKDIR /usr/src/front-ordem-servico
COPY package.json package-lock.json ./
RUN npm install

# Build image
FROM base as build
WORKDIR /usr/src/front-ordem-servico
COPY . .
COPY --from=dependencies /usr/src/front-ordem-servico/node_modules ./node_modules
RUN npm run build
RUN npm prune --production


# Production image
FROM node:20-alpine3.19 AS deploy
WORKDIR /usr/src/front-ordem-servico
RUN npm install -g serve
COPY --from=build /usr/src/front-ordem-servico/dist ./dist
COPY --from=build /usr/src/front-ordem-servico/node_modules ./node_modules
COPY --from=build /usr/src/front-ordem-servico/package.json ./package.json

EXPOSE 5175

CMD ["npm", "run", "start"]