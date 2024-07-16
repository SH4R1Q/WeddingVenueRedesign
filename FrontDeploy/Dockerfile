FROM node:16-alpine as build
WORKDIR /app
RUN apk add --no-cache git
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 5000
CMD ["serve", "-s", ".", "-l", "5000"]