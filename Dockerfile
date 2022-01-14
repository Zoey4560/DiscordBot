FROM node:latest

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src/
RUN npm run build

ENTRYPOINT ["npm", "start"]
