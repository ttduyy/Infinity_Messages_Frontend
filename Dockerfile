# # Stage 1: Build the Angular application
# FROM node:18 AS build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install all dependencies, including devDependencies
# RUN npm install

# # Install Angular CLI globally
# RUN npm install -g @angular/cli

# # Copy the entire project into the container
# COPY . .

# # Build the Angular project
# RUN ng build --output-path=dist/Infinite_Level_Messaging_Angular --configuration=production

# # Stage 2: Serve the Angular application with Nginx
# FROM nginx:alpine

# # Copy the built Angular files from the previous stage
# COPY --from=build /app/dist/Infinite_Level_Messaging_Angular /usr/share/nginx/html

# # Copy custom Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2020 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

FROM nginx:stable
COPY --from=build /app/dist/infinite-level-messaging-angular /usr/share/nginx/html
EXPOSE 80


