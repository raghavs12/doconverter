# Use Node.js as the base image
FROM node:18

# Install LibreOffice
RUN apt-get update && apt-get install -y libreoffice && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
