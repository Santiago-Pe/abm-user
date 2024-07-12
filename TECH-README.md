# Documentación Tecnica

El proyecto esta basado en una estructura de importacion y exportacion con barrels

## App

### Api

#### Actions

En esta carpeta encontrarmos las accions que nos permiten realizar operaciones CRUD desde el lado del servidor, a traves de las actions

### Client

En esta carpeta encontraremos todos los componentes que necesitamos que funcionen del lado del cliente (usando hooks o para hacer api request de lado del cliente)

#### Components

Aca encontraremos los componentes que consuman apis, usen estados y devuelven un tsx como elemento ui

##### forms

##### Header

##### modals

##### sections

#### Hooks

Aca encontraremos los custom hooks usados en el poryecto para la gestion de estados

### Server

Aca encontraremos todos los componentes que se usan del lado del servidor.

#### Components

Aca estaran los componentes UI que no necesitan interactuar con el cliente de manera directa

##### Errors

##### Header

##### Sidebar

##### Navbar

### Types

Aca encontraremos los types que se usan de manera global en todo el proyecto

## Lib

Aca encontraremos nuestros api functions las cuaales usaremos en nuestras actions
