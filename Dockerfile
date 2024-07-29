# Use the official Node.js 14 image as the base image
FROM node:14-buster

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install libvips dependencies
RUN apt-get update && apt-get install -y \
  libvips-dev \
  build-essential \
  pkg-config \
  && rm -rf /var/lib/apt/lists/*

RUN npm install sharp@0.21.3 --ignore-scripts --legacy-peer-deps

# Install project dependencies
RUN npm install --unsafe-perm --ignore-scripts --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (if applicable)
EXPOSE 3000

ENV SKIP_PREFLIGHT_CHECK=true

# Command to run the application
CMD [ "npm", "start" ]
