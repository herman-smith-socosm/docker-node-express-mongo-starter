FROM node:10.6.0-jessie

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY ./dist ./dist

