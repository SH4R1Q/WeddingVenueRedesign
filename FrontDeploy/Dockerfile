FROM node:16-alpine as build
WORKDIR /app
# git and curl install
RUN apk add --no-cache git curl
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
RUN npm install -g serve && apk add --no-cache curl
WORKDIR /app
#only copy final build from above stage
COPY --from=build /app/dist .
EXPOSE 5000
CMD ["serve", "-s", ".", "-l", "5000"]