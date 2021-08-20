FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine as production

LABEL org.opencontainers.image.source https://github.com/mattjaikaran/fitness-api

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY public public
COPY --from=development /usr/src/app/dist ./dist

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=4000
ENV PORT=${PORT}

EXPOSE ${PORT}

ARG JWT_SECRET=6c1626f54cc345ed8bfaf21a1e923d1e
ENV JWT_SECRET=${JWT_SECRET}

CMD ["node", "dist/main"]
