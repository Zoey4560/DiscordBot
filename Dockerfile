FROM node:latest

WORKDIR /usr/app

ARG TOKEN
ARG CLIENT_ID
ARG GUILD_ID

ENV TOKEN=${TOKEN}
ENV CLIENT_ID=${CLIENT_ID}
ENV GUILD_ID=${GUILD_ID}

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src/
RUN npm run build

RUN npm run deploy

ENTRYPOINT ["npm", "start"]
