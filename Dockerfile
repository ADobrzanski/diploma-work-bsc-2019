FROM node:10-alpine

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]