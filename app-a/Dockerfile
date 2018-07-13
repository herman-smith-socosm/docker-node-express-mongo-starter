FROM node:10.6.0-jessie

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY ./tsconfig.json ./

COPY ./src ./src
RUN npm run dist
RUN rm -rf ./src
