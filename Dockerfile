# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose the default Next.js port
EXPOSE 3000

# Run Next.js development server
CMD ["npm", "run", "dev"]
