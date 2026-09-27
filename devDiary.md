# Diario del Desarrollador
## Evolución registrada de una API

## 0.⚠️ Aclaración Importante

Este documento es el detalle de la evolución de la API, del proyecto, y de las dificultades que se fueron viendo a lo largo del desarrollo

## 1. Cronología

### 20 de septiembre de 2026

  - Creación de la carpeta del proyecto bajo el nombre de ```proyect```
  - Inicialización del proyecto de NODE 
  - Instalación de Express.js, Mongoose y Bcrypt
  - Creación de la carpeta:  ```src```
  - Creación de la carpeta:  ```middlewares```

### 23 de septiembre de 2026 

  - Instalación de JWT
  - Creación de la carpeta:  ```utils```
  - Creación de los archivos:
    ```
    index.js
    db.js
    seed.js

  - Creación de las carpetas:  
  
    ```
    src/models
    src/services
    src/controllers
    src/routes

  - Creación de los modelos (en src/models/):

    ```
    cabañaModel.js
    contactModel.js
    naturalElementModel.js  // Los elementos de la card de Naturaleza en el Front
    reservationModel.js
    userModel.js

  - Inicio de la Elaboración de los modelos y Schemas
  - Desarrollo de naturalElementModel.js
  - Uso de prueba de seed.js. 
  - Conexión exitosa con MongoDB

### 24 de septiembre de 2026

  - Desarrollo de userModel.js
  - Creación de la carpeta ```utils/constants``` para almacenar constantes 
  - El archivo ```utils/constants/systemConstants.js``` refiere a las constantes de bcrypt
  - El archivo  ```utils/constants/generalConstants.js``` refiere a regexs y constantes en general

### 25 de septiembre de 2026

  - Revisión general del código
  - Instalación de Nodemon

### 26 de septiembre de 2026

  - Problemas con los commits debido
  - Primer commit del proyecto en GitHub
  - Instalación de Firebase
  - Instalación de Firebase tools
  - Generación de la clave privada de Firebase para su utilización en un futuro próximo en la carpeta ```privateKeys/``` (excluida del repositorio)
  - Desinstalación de dichas herramientas por complicaciones con el dominio

### 27 de septiembre de 2026

  - Segundo commit del proyecto en Github
  - Se dio inicio al desarrollo de la funcionalidad de user aprovechando la Actividad N°13 de la UTN 
