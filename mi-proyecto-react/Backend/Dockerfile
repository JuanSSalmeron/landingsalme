# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (usa el patrón para incluir package.json y package-lock.json si existe)
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --omit=dev

# Copia el resto de los archivos de la app
COPY . .

# Expone el puerto en el que corre el servidor (asegúrate de que coincide con tu backend)
EXPOSE 4000

# Comando para iniciar la app (requiere que tengas "start" definido en package.json)
CMD ["npm", "start"]
