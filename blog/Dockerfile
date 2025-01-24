FROM node:20-alpine AS build

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

