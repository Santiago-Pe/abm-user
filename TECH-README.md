# Documentación Técnica

Este proyecto está basado en una estructura de importación y exportación con barrels.

## App

### Api

#### Actions

En esta carpeta encontramos las acciones que nos permiten realizar operaciones CRUD desde el lado del servidor, a través de las actions.

### Client

En esta carpeta encontraremos todos los componentes que necesitamos que funcionen del lado del cliente (usando hooks o para hacer solicitudes API desde el lado del cliente).

#### Components

Aquí encontraremos los componentes que consumen APIs, usan estados y devuelven un `tsx` como elemento UI.

##### Forms

Componentes dedicados a la gestión y validación de formularios.

##### Modals

Componentes de modales utilizados para diálogos y ventanas emergentes en la aplicación.

##### Sections

Componentes que representan secciones específicas de la interfaz de usuario, organizando y mostrando datos de manera estructurada.

#### Hooks

Aquí encontraremos los custom hooks usados en el proyecto para la gestión de estados, efectos y lógica compartida.

### Server

Aquí encontraremos todos los componentes que se usan del lado del servidor.

#### Components

Aquí estarán los componentes UI que no necesitan interactuar con el cliente de manera directa.

##### Errors

Componentes para manejar y mostrar errores en la interfaz de usuario.

##### Header

Componentes de cabecera específicos para renderizado del lado del servidor.

##### Sidebar

Componentes de barra lateral utilizados en el servidor.

##### Navbar

Componentes de barra de navegación utilizados en el servidor.

### Types

Aquí encontraremos los types que se usan de manera global en todo el proyecto. Estos incluyen definiciones de interfaces y tipos que son reutilizados a lo largo del proyecto para asegurar consistencia y seguridad en el uso de TypeScript.

## Lib

Aquí encontraremos nuestras funciones API las cuales usaremos en nuestras acciones. Estas funciones encapsulan la lógica para interactuar con servicios externos o realizar operaciones complejas, proporcionando una capa de abstracción para las acciones del servidor y del cliente.
