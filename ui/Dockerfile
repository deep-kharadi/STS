# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# RUN npm run build

# Copy the application code
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the Next.js application
CMD ["npm","run","build","npm", "start"]
