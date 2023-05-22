
FROM node:lts-alpine as runtime

WORKDIR /app

COPY package.json .
COPY index.js .

RUN npm install

CMD ["node", "index.js"]