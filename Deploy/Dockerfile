FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./Deploy/.env
EXPOSE 9000
CMD ["npm", "start"]