# Etapa 1: Build de la app con Vite y TypeScript
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Ejecuta el build con TypeScript y Vite
RUN npm run build

# Etapa 2: Servir build con Nginx
FROM nginx:stable-alpine

# Copia el build de Vite (dist) a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración opcional personalizada de Nginx (para React Router si usas rutas)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
