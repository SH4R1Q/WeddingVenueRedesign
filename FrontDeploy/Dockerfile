FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache git
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]