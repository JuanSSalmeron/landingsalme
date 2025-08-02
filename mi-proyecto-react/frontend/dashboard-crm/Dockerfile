# Etapa 1: Build de la app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copia el build de React a la carpeta pública de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia configuración opcional de Nginx si tienes una
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
