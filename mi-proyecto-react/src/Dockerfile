FROM node:18

WORKDIR /app

# Copia solo archivos de dependencias
COPY package*.json ./

# Instala dependencias limpio
RUN npm install

# Copia el resto del proyecto
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
