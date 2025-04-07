FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production && \
    rm -rf src tests

EXPOSE 3000

CMD ["npm", "start"]