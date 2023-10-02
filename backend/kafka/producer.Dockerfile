FROM node:14-alpine as build
LABEL authors="grnx"
WORKDIR /app
ADD *.json ./
RUN npm install --omit=dev
ADD . .

CMD ["node", "producer.js", "Adam"]