FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./FrontDeploy/.env
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "dist"]