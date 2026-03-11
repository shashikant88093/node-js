FROM node:20
WORKDIR /app

COPY package*.json .
COPY consumer.js .

RUN npm install

CMD [ "npm","start" ]