# Deploy/Dockerfile

FROM node:16-alpine

WORKDIR /app

# Install Git
RUN apk add --no-cache git

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["node", "src/app.js"]
