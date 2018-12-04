#!/bin/bash

echo "docker打包中..."

docker build -t xuhui5018/nuxt_dreamintoreal:0.0.1 .

echo "docker部署中..."

docker container run -p 3000:3000 -itd --name xuhui5018/nuxt_dreamintoreal:0.0.1
