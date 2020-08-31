FROM node:10-alpine AS builder
COPY ./package* ./
RUN apk update && apk upgrade
RUN apk --no-cache add --virtual builds-deps build-base python git
RUN npm ci
COPY . ./
RUN npm run build
RUN npm prune --production

FROM node:10-alpine
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder dist /usr/src/app/dist
COPY --from=builder node_modules /usr/src/app/node_modules
COPY . /usr/src/app

CMD ["npm", "run", "start:prod"]
