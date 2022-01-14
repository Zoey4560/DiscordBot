FROM node:latest

WORKDIR /usr/app

ARG TOKEN
ENV TOKEN=${TOKEN}

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src/
RUN npm run build

ENTRYPOINT ["npm", "start"]
