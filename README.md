# Documentación del Proyecto

## Descripción General

Este proyecto es una aplicación web desarrollada utilizando **Next.js**, **React**, **TypeScript** y **PrimeReact**. La aplicación incluye funcionalidades para la gestión de usuarios (ABM - Alta, Baja, Modificación), permitiendo crear, editar, eliminar y actualizar la lista de usuarios.

## Instalación y Configuración

### Requisitos Previos

Asegúrate de tener instalado Node.js en tu máquina. Puedes descargarlo desde [Node.js](https://nodejs.org/).

### Clonar el Repositorio

Clona el repositorio del proyecto a tu máquina local utilizando el siguiente comando:

```bash
git clone <URL_DEL_REPOSITORIO>
```

### Clonar el Repositorio

Navega al directorio del proyecto e instala las dependencias necesarias utilizando npm o yarn:

```bash
cd client
npm install
# o
yarn install

```

### Scripts Disponibles

En el archivo package.json se definen varios scripts para facilitar el desarrollo y despliegue de la aplicación:

- dev: Inicia el servidor de desarrollo.
- build: Compila la aplicación para producción.
- start: Inicia el servidor de producción.
- lint: Ejecuta el linter para verificar el código.

Puedes ejecutar estos scripts utilizando npm o yarn. Por ejemplo:

```bash
npm run dev
# o
yarn dev

```

## Instalación y Configuración

La aplicación permite realizar las siguientes operaciones sobre usuarios:

#### Crear Usuario

Para crear un nuevo usuario, navega a la sección de gestión de usuarios y haz clic en el botón "Crear Usuario". Rellena el formulario con la información del usuario y haz clic en "Guardar".

#### Editar Usuario

Para editar un usuario existente, navega a la lista de usuarios, selecciona el usuario que deseas editar y haz clic en el botón "Editar". Modifica la información en el formulario y haz clic en "Guardar".

#### Eliminar Usuario

Para eliminar un usuario, navega a la lista de usuarios, selecciona el usuario que deseas eliminar y haz clic en el botón "Eliminar". Confirma la eliminación en el cuadro de diálogo que aparece.

#### Listar Usuarios

La lista de usuarios se puede ver en la sección de gestión de usuarios. Aquí podrás ver una tabla con todos los usuarios registrados, junto con opciones para editar o eliminar cada usuario.

## Dependencias

### Producción

- next: Framework de React para la creación de aplicaciones web.
- primeicons: Iconos utilizados por PrimeReact.
- primereact: Biblioteca de componentes de interfaz de usuario.
- react: Biblioteca de JavaScript para construir interfaces de usuario.
- react-dom: Complemento para trabajar con el DOM en aplicaciones React.
- zod: Biblioteca para validaciones y esquemas.

### Desarrollo

- @types/node: Tipos de TypeScript para Node.js.
- @types/react: Tipos de TypeScript para React.
- @types/react-dom: Tipos de TypeScript para React DOM.
- eslint: Herramienta para identificar y reportar patrones en ECMAScript/JavaScript.
- eslint-config-next: Configuración de ESLint específica para Next.js.
- typescript: Lenguaje de programación que es un superconjunto de JavaScript.

## Ejecución con Docker

### Requisitos Previos

Asegúrate de tener Docker instalado en tu máquina. Puedes descargarlo desde [Docker's official website](https://www.docker.com/).

### Construir la Imagen Docker

Para ejecutar la aplicación utilizando Docker, primero necesitas construir la imagen Docker. Asegúrate de estar en el directorio raíz del proyecto donde se encuentra el Dockerfile.

```bash
docker build . --file Dockerfile --tag nombre_usuario/abm-user:latest
```

Reemplaza nombre_usuario con tu nombre de usuario de Docker Hub o el registro donde desees almacenar la imagen.

### Ejecutar el Contenedor Docker

Una vez construida la imagen, puedes ejecutar el contenedor Docker utilizando el siguiente comando:

```bash
docker run -p 3000:3000 nombre_usuario/abm-user:latest
```

Este comando ejecuta el contenedor y redirige el puerto 3000 del contenedor al puerto 3000 de tu máquina local, donde se ejecutará la aplicación.

### Acceder a la Aplicación

Abre un navegador web y navega a http://localhost:3000 para acceder a la aplicación. Ahora deberías poder interactuar con la aplicación web desarrollada con Next.js, React, TypeScript y PrimeReact utilizando Docker.
