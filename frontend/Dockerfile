# Use official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . /app/

# Build the React app
RUN npm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose the port
EXPOSE 5173

# Serve the built files
CMD [ "serve", "-s", "dist" ]