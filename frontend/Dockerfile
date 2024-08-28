FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY pacage*.json /usr/src/app/

RUN npm install

COPY . .
RUN npm run build
# make use of multistage build to keep image smaller
