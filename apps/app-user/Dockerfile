# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR usr/apps/app-user

# Copy the root package.json and package-lock.json
COPY ../../package*.json ../../package-lock.json ./

# Install dependencies
RUN npm install

# Copy the Nx workspace configuration files
COPY ../../nx.json ../../workspace.json ../../tsconfig.base.json

# Copy the libs directory if you have shared libraries
COPY ../../shared-ui ../shared-ui

# Build the app-user project
RUN npx nx build app-user

# Install serve to serve the build files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["serve", "-s", "dist/apps/app-user"]
