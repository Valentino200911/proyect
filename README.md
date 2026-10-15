# Proyecto de Backend: Cabañas Aguaribay (BOCETO DE README)

## 💻 Las Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías en su interior:

* Express 5
* CORS.
* Bcrypt.
* Mongoose con una db en MongoDB.
* JSON Web Token.

## 🏢 La Estructura de Carpetas

```text

proyect/   # CARPETA RAÍZ
   ├ 
   ├ middlewares/            
   ├   ├ 
   ├   ├ allowRoles.js    
   ├   ├ handleError.js
   ├   ├ verifyToken.js
   ├ 
   ├ node_modules/  
   ├       
   ├ postman/
   ├   ├
   ├   ├ Cabañas Aguaribay.postman_collection.json # Colección de postman para probar consultas HTTP
   ├
   ├ privateKeys/ # excluida por .gitignore
   ├   ├ 
   ├   ├ privateKey.js    
   ├   ├ serviceAccountKey.json
   ├    
   ├ src
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
   ├   ├          ├ authServices.js
   ├   ├          ├ contactServices.js
   ├   ├          ├ cottageServices.js
   ├   ├          ├ naturalElementServices.js
   ├   ├          ├ reservationServices.js
   ├   ├          ├ userServices.js
   ├   ├ db.js
   ├   ├ index.js
   ├   ├ seed.js 
   ├  
   ├utils/
   ├   ├
   ├   ├ constants/
   ├   ├         ├   
   ├   ├         ├ generalConstants.js
   ├   ├         ├ rolesConstants.js # Definición de roles
   ├   ├
   ├   ├config.js
   ├   ├ErrorApp.js

   ├ .env             # .env privada, excluida según el .gitignore   
   ├ .env.example     #Ejemplo de la .env   
   ├ .gitignore   
   ├ devDiary.md   
   ├ gaps.md
   ├ package-lock.json  
   ├ package.json     
   ├ README.md        #Este README en sí mismo
   ├ roleTable.png    #Roles de usuario y admin

```

---

## 3. ▶️ Inicialización del Proyecto

### **Clonar el Repositiorio**

```bash
git clone https://github.com/Valentino200911/proyect.git
```

### **Ir a la raíz del proyecto**

```bash
cd proyect
```

### **Instalar las Dependencias**

```bash
npm install
```

### **Obtener el archivo .env a través del siguiente link de Google Drive**

<https://drive.google.com/drive/folders/1nA7iEe_w-JCtKacNc61noEHBjGGRrdC7?usp=sharing>

### **Abrir y establecer alguna conexión en MongoDB Compass**

### **Seleccionar "Abrir terminal integrado" en la carpeta src y correr la seed en VSC**

```bash
npm run seed
```

### **Tras esto, correr el proyecto**

```bash
npm run dev
```

## Rutas

Las rutas que admite el presente proyecto son

```txt

   http://localhost:3000/api/auth

      http://localhost:3000/api/auth/login
      http://localhost:3000/api/auth/register
      http://localhost:3000/api/auth/profile

   http://localhost:3000/api/naturalelement

      http://localhost:3000/api/naturalelement/get #getAll
      http://localhost:3000/api/naturalelement/get/:id #getById
      http://localhost:3000/api/naturalelement/post #create
      http://localhost:3000/api/naturalelement/patch #update
      http://localhost:3000/api/naturalelement/delete #delete

   http://localhost:3000/api/user

      http://localhost:3000/api/user/get #getAll
      http://localhost:3000/api/user/get/:id #getById
      http://localhost:3000/api/user/post #create # ESTÁ DESHABILITADA, PERO ES FUNCIONAL
      http://localhost:3000/api/user/patch #update
      http://localhost:3000/api/user/delete #delete

   http://localhost:3000/api/cottage

      http://localhost:3000/api/cottage/get #getAll
      http://localhost:3000/api/cottage/get/:id #getById
      http://localhost:3000/api/cottage/post #create 
      http://localhost:3000/api/cottage/patch #update
      http://localhost:3000/api/cottage/delete #delete # PRESENTA ERROR

   http://localhost:3000/api/contact

      http://localhost:3000/api/contact/get #getAll
      http://localhost:3000/api/contact/get/:id #getById
      http://localhost:3000/api/contact/post #create - SÓLO VÁLIDA A TRAVÉS DE TOKEN DE 'user'
      http://localhost:3000/api/contact/patch #update
      http://localhost:3000/api/contact/delete #delete, PRESENTA ERROR

   http://localhost:3000/api/reservation - DEBEN SER REVISADAS

      http://localhost:3000/api/reservation/get/allReservations #getAll
      http://localhost:3000/api/reservation/get/:id #getById
      http://localhost:3000/api/reservation/get/user/allReservations #getAllReservationsFromUser - SÓLO VÁLIDA A TRAVÉS DE TOKEN DE 'user'
      http://localhost:3000/api/reservation/get/user/:id #getByIdAReservationFromUser - SÓLO VÁLIDA A TRAVÉS DE TOKEN DE 'user'
      http://localhost:3000/api/reservation/post #create - SÓLO VÁLIDA A TRAVÉS DE TOKEN DE 'user'
      http://localhost:3000/api/reservation/patch #update

```

Las colecciones que no están marcadas como "SÓLO VÁLIDA A TRAVÉS DE TOKEN DE 'user'" se deben utilizar a través de un token de admin

Para más info., revisar la carpeta routes/
