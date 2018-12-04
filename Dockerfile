FROM node:8.12.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

#移动文件
COPY . /usr/src/app

RUN npm i --production

RUN npm i -g nuxt

RUN npm run build

EXPOSE 3000

CMD npm run start
