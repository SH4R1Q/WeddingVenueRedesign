FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env  
# Copy the .env file to the container

CMD ["node", "app.js"]
