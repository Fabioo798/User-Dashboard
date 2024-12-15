# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR usr/apps/api/src

# Copy package.json and package-lock.json
COPY package*.json ../../package.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ../../nx.json ../../workspace.json ../../tsconfig.base.json

# Build the application
RUN npm nx build api

# Expose the port the app runs on
EXPOSE 4800

# Start the application
CMD ["npx", "nx", "serve", "api"]
