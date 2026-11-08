# Proyecto de Backend: Cabañas Aguaribay

## Descripción del Proyecto

El presente proyecto refiere a la creación de una API REST que maneje la lógica de negocio existente en **Cabañas Aguaribay**, un negocio de alquiler turístico de cabañas ubicado en el Valle del San Javier, TafÍ Viejo, Tucumán; a través de la Arquitectura Cliente-Servidor y una separación de responsabilidades clara entre Modelos, Servicios, Controladores y Ruteo.

## Esquema de la Base de Datos (MongoDB)

| Base de Datos | MONGO_URI |
| ------------- | -------------------------------------------- |
| cabañas_aguaribay | mongodb://localhost:27017/cabañas_aguaribay |

| Collección | Descripción | Índices (UNIQUE) |
| ---------- | ----------- | ------- |
| contacts | Colección que alberga los mensajes enviados por el usuario, debido a motivos no relacionados con reservar una cabaña | _id |
| cottages | Colección que alberga las cabañas que maneja el negocio | _id, name |
| naturalelements | Colección que alberga la información de la flora y la fauna local (Es equivalente a las NatureCards del front presentado anterirormente) | _id, binomialName |
| reservations | Colección que alberga todas las reservaciones realizadas con el paso del tiempo. Es lo que realmente maneja el negocio | _id |
| users | Colección que alberga a los usuarios registrados en el sitio | _id, phoneNumber, email |

## 💻 Las Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías en su interior:

* Express 5
* CORS.
* Bcrypt
* Mongoose con una Base de Datos en MongoDB.
* JSON Web Token.
* OPEN API - Swagger (swagger-jsdoc && swagger-ui-express)
* Multer y SUPABASE

## 3. ▶️ Inicialización del Proyecto

##### Clonar el Repositiorio

```bash
git clone https://github.com/Valentino200911/proyect.git
```

##### Ir a la raíz del proyecto

```bash
cd proyect
```

##### Instalar las Dependencias

```bash
npm install
```

##### Obtener el archivo .env a través del siguiente link de Google Drive

<https://drive.google.com/drive/folders/1nA7iEe_w-JCtKacNc61noEHBjGGRrdC7?usp=sharing>

##### Abrir y establecer alguna conexión en MongoDB Compass

```mongodb

```

##### Seleccionar "Abrir terminal integrado" en la carpeta src/ y correr la seed en la Terminal de Visual Studio Code

```bash
npm run seed
```

##### Tras esto, correr el proyecto

```bash
npm run dev
```

##### Después, ingrese a este link del Storage del Proyecto en SUPABASE, servirá para las pruebas posteriormente

<https://supabase.com/dashboard/project/wbiruthlzrzibmgrzboh>

## Endpoints

Las rutas que admite el presente proyecto son:

```env

    Auth - http://localhost:3000/api/auth

      http://localhost:3000/api/auth/login # CREATE (Inicio de sesión)
      http://localhost:3000/api/auth/register # CREATE
      http://localhost:3000/api/auth/profile # GET BY ID - allowed
      http://localhost:3000/api/auth/profile # UPDATE (Someter a revisión) - allowed

   User - http://localhost:3000/api/user

      http://localhost:3000/api/user/ # GET ALL - adminOnly
      http://localhost:3000/api/user/:id # GET BY ID - adminOnly
      http://localhost:3000/api/user/:id # UPDATE - allowed
      http://localhost:3000/api/user/:id # DELETE - adminOnly

   Cottage - http://localhost:3000/api/cottage

      http://localhost:3000/api/cottage/ # GET ALL - allowed
      http://localhost:3000/api/cottage/:id # GET BY ID - allowed
      http://localhost:3000/api/cottage/ # CREATE - adminOnly
      http://localhost:3000/api/cottage/:id # UPDATE - adminOnly
      http://localhost:3000/api/cottage/:id # DELETE - adminOnly

   Reservation - http://localhost:3000/api/reservation

      http://localhost:3000/api/reservation/ # GET ALL - allowed (Filtrado por rol)
      http://localhost:3000/api/reservation/:id # GET BY ID - allowed (Filtrado por rol)
      http://localhost:3000/api/reservation/ # CREATE
      http://localhost:3000/api/reservation/:id # UPDATE - allowed (Filtrado por rol)
      http://localhost:3000/api/reservation/:id # DELETE - adminOnly
   
   Contact - http://localhost:3000/api/contact

      http://localhost:3000/api/contact/ # GET ALL - allowed (Filtrado por rol)
      http://localhost:3000/api/contact/:id # GET BY ID - allowed (Filtrado por rol)
      http://localhost:3000/api/contact/ # CREATE - userOnly
      http://localhost:3000/api/contact/:id # UPDATE - allowed
      http://localhost:3000/api/contact/:id # DELETE - adminOnly


   NaturalElement - http://localhost:3000/api/naturalelement

      http://localhost:3000/api/naturalelement/ # GET ALL - allowed
      http://localhost:3000/api/naturalelement/:id # GET BY ID - allowed
      http://localhost:3000/api/naturalelement/ # CREATE - adminOnly
      http://localhost:3000/api/naturalelement/:id # UPDATE - adminOnly
      http://localhost:3000/api/naturalelement/:id # DELETE - adminOnly
   
   Otros Endpoints

      http://localhost:3000/api-docs # OPEN API 
      http://localhost:3000/api-docs.json # OPEN API (En formato .json)

```

---

## 🏢 La Estructura de Carpetas

```text

proyect/   # CARPETA RAÍZ
   ├
   ├ documents/ # Documentación del proyecto           
   ├   ├ 
   ├   ├ devDiary.md     
   ├   ├ gaps.md 
   ├   ├ roleTable.png    # Roles de usuario y admin
   ├
   ├ node_modules/  
   ├       
   ├ postman/
   ├   ├
   ├   ├ Cabañas Aguaribay.postman_collection.json # Colección de POSTMAN para probar consultas HTTP
   ├
   ├ src
   ├   ├
   ├   ├ config/
   ├   ├          ├
   ├   ├          ├ supabase.js
   ├   ├ 
   ├   ├ controllers/
   ├   ├          ├
   ├   ├          ├ authController.js
   ├   ├          ├ contactController.js
   ├   ├          ├ cottageController.js
   ├   ├          ├ naturalElementController.js
   ├   ├          ├ reservationController.js
   ├   ├          ├ userController.js
   ├   ├  
   ├   ├ docs/
   ├   ├          ├
   ├   ├          ├ swagger.js # Documentación con SWAGGER
   ├   ├ 
   ├   ├ middlewares/            
   ├   ├          ├ 
   ├   ├          ├ allowRoles.js    
   ├   ├          ├ handleError.js
   ├   ├          ├ uploadImages.js
   ├   ├          ├ verifyToken.js 
   ├   ├          
   ├   ├ models/
   ├   ├          ├
   ├   ├          ├ contactModel.js
   ├   ├          ├ cottageModel.js
   ├   ├          ├ naturalElementModel.js
   ├   ├          ├ reservationModel.js
   ├   ├          ├ userModel.js
   ├   ├         
   ├   ├ routes/
   ├   ├          ├
   ├   ├          ├ authRoutes.js
   ├   ├          ├ contactRoutes.js
   ├   ├          ├ cottageRoutes.js
   ├   ├          ├ naturalElementRoutes.js
   ├   ├          ├ reservationRoutes.js
   ├   ├          ├ userRoutes.js
   ├   ├
   ├   ├ services/
   ├   ├          ├
   ├   ├          ├ authService.js
   ├   ├          ├ storage/
   ├   ├          ├          ├local.js           
   ├   ├          ├          ├supabase.js
   ├   ├          ├           
   ├   ├          ├ contactService.js
   ├   ├          ├ cottageService.js
   ├   ├          ├ naturalElementService.js
   ├   ├          ├ reservationService.js
   ├   ├          ├ storageSupabaseService.js   
   ├   ├          ├ userService.js
   ├   ├
   ├   ├utils/
   ├   ├   ├
   ├   ├   ├ constants/
   ├   ├   ├         ├   
   ├   ├   ├         ├ generalConstants.js
   ├   ├   ├         ├ rolesConstants.js # Definición de roles
   ├   ├   ├         ├ supabaseConstants.js # Definición de roles
   ├   ├   ├
   ├   ├   ├ config.js
   ├   ├   ├ ErrorApp.js
   ├   ├   ├ uniqueName.js
   ├   ├ 
   ├   ├ app.js  
   ├   ├ db.js
   ├   ├ index.js
   ├   ├ seed.js 
   ├  
   ├ .env             # .env privada, excluida según el .gitignore   
   ├ .env.example     # Ejemplo de la .env   
   ├ .gitignore   
   ├ package-lock.json  
   ├ package.json     
   ├ README.md        # Este README en sí mismo

```

Para más información, revisar la carpeta routes/

## Datos MOCK

**Colección de POSTMAN:**  `postman/Cabañas Aguaribay.postman_collection.json`

* Para mayor rapidez a la hora de hacer las comprobaciones, importe el archivo .json de arriba a POSTMAN
* En la carpeta raíz de la colección (Cabañas Aguaribay), deberá definir las variables (en la pestaña "variables") de **adminToken**, **userToken** y **anyToken**, correspondientes a las restricciones de token que tienen las rutas. Para poder hacer eso, tendrá que hacer el inicio de sesión con las consultas 1.2 (Login Admin) y 1.3 (Login User). Deberá obtener su token e insertarlo en la variable correspondiente o, en el Local Vault de Postman

### 1. Auth

#### 1.1. Register - POST

```json

   {

   "name": "luis",
   "surname": "gomez",
   "birthDate": "1988-11-09",
   "phoneNumber": "+5491534575336",
   "email": "luis.gomezw@gmail.com",
   "password": "ABCDEFGHI"

   }

```

#### 1.2. Login (Admin) - POST

```json

   {
    "email": "pedro.gomez@gmail.com",
    "password": "Admin123"
   }

```

#### 1.3. Login (User - Juan) - POST

```json

   {

    "email": "juan.perez@gmail.com",
    "password": "Password123"

   }  

```

* Si usted desea probar los filtros por usuario de algunas querys, puede alternar **userToken** y **anyToken** con el token obtenido de la siguiente consulta:

#### 1.3.1. Login (User - Jose) - POST

```json

{
    "email": "jose.juarez@gmail.com",
    "password": "Jose1234"
}

```

* De ahí, las colecciones pueden probarse en cualquier orden

### 2. User

* Tenga en cuenta las restricciones por rol del código a la hora de operar

### 3. Cottage

* Para el POST, descarge la imagen "Imagen de Prueba - COTTAGE" de:

<https://drive.google.com/file/d/1hNYDar0mltB8xMZWt2MLsoFBOxgGy_2A/view?usp=drive_link>

Y, en el apartado de form-data, coloque (transformando los datos e importando la img. descargada localmente):

```json

{
   "name": "cabaña 4",
   "capacity": 4,
   "pricePerNightAndPerson": 25000,
   "description": "Un lugar para descansar en contacto con la naturaleza",
   "image": "Imagen de Prueba - COTTAGE.png", // Importe la img. localmente

}

   // Si por algún motivo, hay un error de conectividad:
      /*
         - Revise SUPABASE
         - Reinicie el servidor
         - Reinicie la seed
         - Vuelva a importar el archivo
      */

```

### 4. Reservation

```json

{
    "cottage": "6a...", // Seleccione o escriba el _id de "cabaña 1" 6a...
    "entryDate": "2026-11-25",
    "exitDate": "2026-11-28",
    "passengerNumber": "3",
    "methodOfPayment": "cash",
    "reservationComment": "Hi, 000"
}
      
```

### 5. Contact

```json

{
    "reasonOfContact": "suggestion",
    "contactComment": "Hi 1234"
}
```

### 6. NaturalElement

* Para el POST, descarge la imagen "Imagen de Prueba - NATURALELEMENT" de:

<https://drive.google.com/file/d/1eFcS1j7IxKCODyv6xA-J0uvqoZ83DuIO/view?usp=drive_link>

Y, en el apartado de form-data, coloque (transformando los datos e importando la img. descargada localmente):

```json

{
   "name": "Perro",
    "binomialName": "Canis lupus familiaris",
    "description": "Es un animal peludo que ladra",
    "image": "Imagen de Prueba - NATURALELEMENT.png", // Importe el archivo
    "info": "https://es.wikipedia.org/wiki/Canis_familiaris",
}

```

---

## Funcionalidades

### Funcionalidades Implementadas

* Manejo de Registro, Login y Perfil
* Implementación de Roles de Usuario y restricciones a las acciones de los mismos
* Manejo de operaciones completas de CRUD para Cottage (Cabañas), User (Usuarios), Contact (Contactos), NaturalElement (Elementos de Naturaleza)
* Manejo de Validaciones en los modelos y servicios
* Manejo Centralizado del Error
* Almacenamiento en SUPABASE para NaturalElement y Cottage
* Rutas Restringidas

* #### Manejo de la Reservación

  * Manejo completo de un flujo de operaciones
    * Modelo
      * Referencias a User y Cottage
      * Validaciones Internas
    * Servicio
    * Controlador
    * Ruteo

  * Manejo de todas las Operaciones CRUD

    * Restricciones por rol:

    * **admin:** es capaz de:
      * Editar el estado de la reservación (reservationState) y el estado de pago (isPaid)
      * Obtener TODAS las reservaciones
      * Eliminar reservaciones
      * Obtener una reservación por su _id

    * **user:** es capaz de:
      * Obtener todas SUS reservaciones (Filtrado por rol)
      * Cancelar su reservación (reservationState)
      * Obtener una reservación SUYA por su _id
      * Modificar el comentario de la reservación (reservationComment)

    * Validaciones concernientes a la lógica de negocio
      * Validación de fechas:
        * Una reservación no se hace en el pasado
        * Una reservación no puede durar más de 7 días
        * La fecha de ingreso tiene que ser menor a la fecha de egreso
      * Validación de superposición de fechas
        * En una cabaña, no debe haber otras reservaciones que coincidan en fecha con la que está por crearse
        * Debe haber un día "colchón", entre dos reservaciones
        * Además, si una reservación tiene reservationState "in progress" solo hay dos caminos: o se vuelve "fallen", o se vuelve "done". Una vez cambiado el estado no hay vuelta atrás. Para "in progress" y "fallen", isPaid: false, para "done", isPaid: true,
      * Validación de capacidad de cabañas
        * La reservación no puede incluir más personas que la capacidad de la cabaña

### Funcionalidades a Futuro

* Creación de un rol de SUPER ADMIN que pueda eliminar a otros admin (Actualmente un admin puede crear, pero no degradar a un admin)
* Manejo del Error 429: Rate Limit
* Validación de un registro de usuario a través de un email de NODEMAILER (authService.js )
* Mediante alguna librería de JS, permitir que pasado cierto tiempo, si una reservación no es pagada (isPaid: false), se vuelva automáticamente como "fallen"
