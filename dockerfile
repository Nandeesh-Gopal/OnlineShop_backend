# Use Node 18 base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of your project
COPY . .

# Expose backend port
EXPOSE 5000

# Start your app
CMD ["npm", "start"]
