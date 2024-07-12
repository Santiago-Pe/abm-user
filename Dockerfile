# Usa Node.js v20.15.1
FROM node:20.15.1

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto en el contenedor si es necesario
# EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
