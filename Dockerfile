FROM node:8.11.3

ENV NODE_PATH .
ENV NODE_ENV development

WORKDIR /usr/src/prototype

COPY package.json yarn.lock ./

RUN yarn install && yarn cache clean

COPY . .

CMD [ "node", "server.js" ]
