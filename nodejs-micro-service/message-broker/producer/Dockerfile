FROM node:20
WORKDIR /app

COPY package*.json .
COPY producer.js .

RUN npm install

CMD [ "npm","start" ]