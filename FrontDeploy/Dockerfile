FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env  
# Copy the .env file to the container

RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build"]
