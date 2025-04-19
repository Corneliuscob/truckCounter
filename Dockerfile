# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 8117

ENV PORT=8117

# Start the Next.js app
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
# CMD ["node", "server.js"]