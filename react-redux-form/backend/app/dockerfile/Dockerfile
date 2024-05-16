# Use the latest Node.js image as base
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install coreutils package
RUN apt-get update && apt-get install -y coreutils

# Copy the contents of the frontend directory to the working directory inside the container
COPY . .

# Expose the port that the frontend server will run on
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "start"]
