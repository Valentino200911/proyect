# Diario del Desarrollador

## Evolución registrada de una API

## ⚠️ 0. Aclaración Importante

Este documento es el detalle de la evolución de la API, del proyecto, y de las dificultades que se fueron viendo a lo largo del desarrollo

## 1. Cronología

### 20 de septiembre de 2026

- Creación de la carpeta del proyecto bajo el nombre de `proyect`
- Inicialización del proyecto de NODE
- Instalación de Express.js, Mongoose y Bcrypt
- Creación de la carpeta: `src`
- Creación de la carpeta: `middlewares`

### 23 de septiembre de 2026

- Instalación de JWT
- Creación de la carpeta: `utils`
- Creación de los archivos:

  ```js
  index.js;
  db.js;
  seed.js;
  ```

- Creación de las carpetas:

  ```js
  src/models;
  src/services;Creación del archivo `naturalElementController.js`
  src/controllers;
  src/routes;Creación del archivo `naturalElementController.js`
  ```

- Creación de los modelos (en src/models/):

  ```js
  cabañaModel.js;
  contactModel.js;
  naturalElementModel.js; // Los elementos de la card de Naturaleza en el Front
  reservationModel.js;
  userModel.js;
  ```

- Inicio de la Elaboración de los modelos y Schemas
- Desarrollo de naturalElementModel.js. Esto supone una modificación de la estructura de base de datos, sin embargo, es una colección aislada que no toma datos de otros elementos de la db
- Uso de prueba de seed.js.
- Conexión exitosa con MongoDB y registro de un modelo

### 24 de septiembre de 2026

- Desarrollo de userModel.jsgeneralConstants.js
- Creación de la carpeta `utils/constants` para almacenar constantes
- El archivo `utils/constants/systemConstants.js` refiere a las constantes de bcrypt
- El archivo `utils/constants/generalConstants.js` refiere a regexs y constantes en general

### 25 de septiembre de 2026

- Revisión general del código
- Instalación de Nodemon

### 26 de septiembre de 2026

- Problemas con los commits debido
- Primer commit del proyecto en GitHub
- Instalación de Firebase
- Instalación de Firebase tools
- Generación de la clave privada de Firebase para su utilización en un futuro próximo en la carpeta `privateKeys/` (excluida del repositorio)
- Desinstalación de dichas herramientas por complicaciones con el dominio

### 27 de septiembre de 2026

- Segundo commit del proyecto en Github
- Se dio inicio al desarrollo de la funcionalidad de user aprovechando la Actividad N°13 de la UTN
- Tercer commit del proyecto en Github
- Inserción del diario del Desarrollador en el proyecto
- Prueba de validaciones y de inserción de usuarios en la DB (exitoso)
- Cuarto commit del proyecto en Github
- Creación de `README.md`
- Creación de `gaps.md` para las brechas en el código
- Creación del archivo `userService.js`
- Reporte de fallos al inicializar con `nodemon npm run dev`, se registra como problema a     resolver, mientras tanto, se empleará `npm run dev`
- Finalización de userService, las correcciones se harán con el controlador, las rutas y postman
- Quinto commit del proyecto en Github
- Creación del archivo `userController.js`
- Finalización de userController
- Sexto commit del proyecto en Github
- Creación del archivo `userRoutes.js`

### 28 de septiembre de 2026

- Correción de errores en las rutas, el index y el userService
- Se dropeó la base "cabañas_aguaribay" para verificación de errores
- Verificación de las rutas. Fallos en PATCH, se registran como gaps
- Vistas las consignas de la UTN, se optó por agregar un método PUT
- Séptimo commit del proyecto en Github

### 29 de septiembre de 2026

- Corrección de los fallos de PATCH y PUT
- Se completa el CRUD de Usuarios
- Traducción de los mensajes de handleError.js a inglés
- Octavo commit del proyecto en Github
- Continuación con el desarrollo de NaturalElement (service)
- Finalización de naturalElementService, las correcciones se realizarán finalizado el controller y el router
- Noveno commit del proyecto en GitHub
- Creación del archivo `naturalElementController.js`
- Finalización de naturalElementController
- Decimo commit del proyecto en Github
- Creación del archivo `naturalElementRoutes.js`
- Finalización del ruteo
- Verificaciones del CRUD
- Undécimo commit del proyecto en GitHub

### 1 de octubre de 2026

- Cambio de rumbo respecto al PUT, debido a que la funcionalidad de dicho verbo es, en Express 5 es extremadamente similar al PATCH (si no tiene validaciones), se optó por eliminar el método PUT de las rutas
- Por cuestiones de orden, se transfirió el archivo .pdf de la consigna del tp a otra carpeta
- Duodécimo commit del proyecto en Github
- Registros de gaps
- Inicio del modelo de `cabañaModel.js`

### 3 de octubre de 2026

- Continuación del modelo de cabañaModel.js
- Adición de los valores `index: true` en `name` de `cabañaModel.js`, `binomialName` de `naturalElementModel.js`
- Finalización del modelo de cabañaModel.js e implementación a seed.js (implementación exitosa)
- Decimotercer commit del proyecto en Github
- Creación del archivo `cabañaService.js`
- Registro de la adición de "{}" para realizar projects en los servicios existentes, todavía está sin definir la información a mostrar
- Finalización del servicio para Cabañas, gaps anotados
- Decimocuarto commit del proyecto en Github
- Creación del archivo `cabañaController.js`
- Finalización del controller para Cabañas, gaps anotados
- Decimoquinto commit del proyecto en Github
- Creación del archivo `cabañaRoutes.js`
- Finalización del router para Cabañas, gaps anotados
- Errores en POSTMAN sobre el uso de la "ñ" de cabañas. Por eso, se cambiarán todas las claves y nombres de archivos a "cottage" (salvo las anotaciones de la base de datos) que digan "cabaña". Ej. `cottageRoutes.js`
- Finalización de las modificaciones
- Verificación y funcionamiento del CRUD
- Decimosexto commit del proyecto en Github
- Inicio del modelo de `contactModel.js`
- Finalización del modelo
- Modificaciones generales a los comentarios de validación de los modelos
- Modificaciones al service de user y cottage para evitar dejar registros huérfanos en contact
- Decimoséptimo commit del proyecto en Github
- Creación del archivo `contactService.js`
- Finalización del servicio para Contact
- Decimoctavo commit del proyecto en Github
- Creación del archivo `contactController.js`
- Finalización del controller para Contact
- Decimonoveno commit del proyecto en Github
- Creación del archivo `contactRouter.js`
- Finalización del Router para Contact
- Verificaciones a través de POSTMAN
- Vigésimo commit del proyecto en Github
- Inicio del modelo de `reservationModel.js`

### 4 de octubre de 2026

- Continuación del modelo de `reservationModel.js`
- Finalización del modelo de `reservationModel.js`
- Vigesimoprimer commit del proyecto en Github
- Creación del archivo `reservationService.js`

### 8 de octubre de 2026

- Vigesimosegundo commit del proyecto en Github
- Debido a la necesidad de buscar información para realizar adecuadamente la funcionalidad de la reservación, se optó por resolver gaps del código y de ahí volver al service de reservación

### 9 de octubre de 2026

- Adición de mensajes en los modelos
- Adición de los project en los servicios
- Corrección del error 500
- Corrección al orden de los middlewares en index.js
- Vigesimo tercer commit del proyecto en Github
