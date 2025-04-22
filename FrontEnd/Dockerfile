# Stage 1: Build Angular Application
FROM node:18-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the full application source
COPY . .

# Build Angular app for production
RUN npm run build --production

# Stage 2: Serve App with Nginx
FROM nginx:alpine

# Copy built app from the previous stage
COPY --from=build app/dist/ProvaTeste/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
