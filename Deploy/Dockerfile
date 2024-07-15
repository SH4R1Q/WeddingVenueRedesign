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

# Expose port
EXPOSE 9000

# Start the application
CMD ["node", "app.js"]
