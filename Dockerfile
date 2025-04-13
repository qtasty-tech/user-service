# user-service/Dockerfile
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app will run on
EXPOSE 5000

# Set the command to run the application
CMD ["node", "src/index.js"]
