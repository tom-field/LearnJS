FROM node:8.12.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i --production

COPY . /usr/src/app

EXPOSE 7001

CMD npm run docker