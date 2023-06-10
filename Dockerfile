# Use an official Node.js runtime as a parent image
# FROM node:16-alpine

# # Set the working directory to /app
# WORKDIR /app

# # Copy package.json and package-lock.json to /app
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the current directory contents to /app
# COPY . .

# # Expose port 3000
# EXPOSE 5000

# # Start the NestJS app
# CMD ["npm", "run", "start:dev"]

# FROM ubuntu:latest

# # Install Node.js
# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
#     apt-get install -y nodejs


# RUN apt-get update && apt-get install -y git


# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to container
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to container
# COPY . .

# # Expose port 5000
# EXPOSE 5000

# # Start the application
# CMD [ "npm", "start" ]

# Use the latest LTS version of Node.js as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Install Ubuntu packages needed for the project
RUN apt-get update \
    && apt-get -y install postgresql-client

RUN apt-get update && apt-get install -y git

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 5000

# Set the environment variables
# ENV NODE_ENV=production
# ENV DATABASE_URL=postgresql://prisma:prisma@localhost:5432/my_app?schema=public

# Start the application
# CMD ["npm", "start:prod"]
