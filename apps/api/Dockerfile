FROM node:lts-alpine

# Set environment variables
ENV DATABASE_PATH=/var/data/dev.sqlite3
ENV JWT_SECRET=random_secret
ENV SALT_ROUNDS=10
ENV PORT=4900

# Set the working directory
WORKDIR /app

# Create a system group and user for running the application
RUN addgroup --system api && \
    adduser --system -G api api

# Copy the application code
COPY dist/apps/api api/

RUN chown -R api:api .

# Install dependencies
RUN npm install sqlite3 knex --save

RUN npm --prefix api --omit=dev -f install

# Ensure the database directory exists
RUN mkdir -p /var/data

VOLUME [ "/var/data" ]

# Expose the port the app runs on
EXPOSE 4900

# Command to run the migrations, seeds (if needed), and start the application
CMD ["node",  "api"]
