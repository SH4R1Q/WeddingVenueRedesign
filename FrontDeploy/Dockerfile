FROM node:16-alpine

WORKDIR /app

# Install Git
RUN apk add --no-cache git

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Copy .env file
COPY .env .env

# Build the application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Serve the application
CMD ["serve", "-s", "build"]
