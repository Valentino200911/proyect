import swaggerJsdoc from "swagger-jsdoc"
import { API_URL } from "../utils/config.js"
import { passwordDigits } from "../utils/constants/generalConstants.js"

const definition = {

    openapi: "3.0.3",                 // la versión del ESTÁNDAR, no la de nuestra API


    "info": {

        title: "API Cabañas Aguaribay",

        version: "1.0.0",
        
        description: "API de Cabañas Aguaribay - Manejo de Usuarios, Reservaciones, Cabañas, Contactos y Elementos de la Naturaleza.\n\n"+
        
        "Las rutas tienen tres tipos de clasificaciones según el rol del usuario:\n\n"+
        
        "**adminOnly**: El token sí o sí debe pertenecer a un usuario de rol 'admin'.\n\n"+

        "**userOnly**: El token sí o sí debe pertenecer a un usuario de rol 'user'.\n\n"+

        "**allowed**: Ambos pueden usar la ruta (con restricciones para el rol 'user' en los resultados).\n\n**"+
        
        "Para probar las rutas protegidas, ingrese a `POST api/auth/login`**, copie el `token` de la respuesta, aprete el botón **Authorize** 🔓 de arriba a la derecha y péguelo. Quedará definido para todas las rutas. Cambielo si resulta necesario.",

        contact: {
            email: "valenvalvo@gmail.com"
        }
    },



    // Dónde está la API. Swagger UI usa el primero para el botón "Try it out"
    servers: [

        { url: `${API_URL}`, description: "Desarrollo (tu máquina)" },

    ],

    tags: [

        { name: "Auth", description: "Login, Registro, Perfil de Usuario" },

        { name: "User", description: "CRUD de Usuario" },

        { name: "Cottage", description: "CRUD de las Cabañas" },

        { name: "Reservation", description: "CRUD de las Reservaciones" },

        { name: "Contact", description: "CRUD de Contactos hechos por el usuario" },

        { name: "NaturalElement", description: "CRUD de información de la Fauna y Flora Local" },

    ],

    components: {

        securitySchemes: {

            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Pegá acá el token que devuelve POST /api/auth/login",
            },
        },

        schemas: {

            Error: {
                type: "object",
                properties: {
                    error: { type: "string", example: "Id is not valid to MongoDB" },
                },
            },

            ValidationError: {

                type: "object",

                properties: {

                    error: { type: "string", example: "The data of the object is not valid" },

                    details: {

                        type: "array",

                        items: { type: "string" },

                        example: ["Your name is required for your account", "The number of companions (excluding you) is required for the register"],

                    },

                },

            },

            User:{

                type: "object",

                properties: {

                    _id: {type:"string", format:"ObjectId", example:"6ae9560a22a36af0e70d1a69"},

                    name: {type:"string", example:"Luis"},

                    surname: {type:"string", example:"Pérez"},

                    birthDate: {type:"string", format: "date-time", example:"1999-12-31T00:00:00.000Z"},

                    phoneNumber: {type:"string", unique: true, example:"+5491333567896"},

                    email: {type:"string", format: "email", unique: true, example:"luis.perez@gmail.com"},

                    password: {type:"string", minLength:`${passwordDigits}`, example:"LuisPerez123"},

                    role: {type:"string", enum: ["admin", "user"], example:"user"},

                    createdAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    updatedAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    __v: {type:"integer", example: 0},
                }

            },

            Cottage:{

                type: "object",

                properties: {

                    _id: {type:"ObjectId || string", example:"6ae9560a22a36af0e70d1a69"},

                    name: {type:"string", example:"cabaña 1"},

                    capacity: {type:"integer", example: 7},

                    pricePerNightAndPerson: {type:"integer", example: 40000},

                    location: {type:"string", enum: ["tafi viejo, tucuman"], example: "tafi viejo, tucuman"},

                    description: {type:"string", example: "un lugar para descansar en contacto con la naturaleza"},

                    image: {type:"string", format: "link", example: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/cottageImagesBucket/1793423330630-kpyhd1.jpg"},

                    createdAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    updatedAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    __v: {type:"integer", example: 0},
                }

            },

            Reservation:{

                type: "object",

                properties: {

                    _id: {type:"string", format:"ObjectId", example:"6ae9560a22a36af0e70d1a69"},

                    user: { $ref: "#/components/schemas/User" },

                    cottage: { $ref: "#/components/schemas/Cottage" },

                    entryDate: {type:"string", format: "date-time", example: "2026-10-12T00:00:00.000Z"},

                    exitDate: {type:"string", format: "date-time", example: "2026-10-15T00:00:00.000Z"},

                    passengerNumber: {type:"integer", description:"El que hace la reservación está incluido al ser almacenado en la base de datos, pero no al enviar la solicitud.", example: 3},

                    totalPrice: {type: "integer", min: "20000", description:"Este campo es calculado", example:"360000"},

                    reservationState: {type: "string", enum: ["in progress", "done", "fallen"], example: "done"},

                    methodOfPayment: {type: "string", enum: ["bankTransfer", "cash"], example: "bankTransfer"},

                    isPaid: {type: "boolean", example: true},

                    reservationComment: {type: "string", nullable: true, example: "Hi 123R"},

                    createdAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    updatedAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    __v: {type:"integer", example: 0},

                }

            },

            Contact:{

                type: "object",

                properties: {

                    _id: {type:"string", format:"ObjectId", example:"6ae9560a22a36af0e70d1a69"},

                    user: { $ref: "#/components/schemas/User" },

                    reasonOfContact: {type: "string", enum: ["prom", "bussiness", "problem", "suggestion",], example: "problem"},

                    contactComment: {type: "string", example: "Hi 123C"},

                    createdAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    updatedAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    __v: {type:"integer", example: 0},
                }

            },

            NaturalElement:{

                type: "object",

                properties: {

                    _id: {type:"string", format:"ObjectId", example:"6ae9560a22a36af0e70d1a69"},

                    name: {type:"string", description: "Esto es para la flora y fauna local", example:"Tusca"},

                    binomialName: {type:"string", description: "Esto es para la flora y fauna local", example:"Vachellia aroma"},

                    description: {type:"string", example: "arbol perteneciente a la familia de las acacias que se ubica en el territorio argentino."},

                    image: {type:"string", format: "link", example: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/naturalElementsImagesBucket/1793165770889-vqf2g6.jpg"},

                    info: {type:"string", format: "link", example: "https://es.wikipedia.org/wiki/Vachellia_aroma"},

                    createdAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    updatedAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},

                    __v: {type:"integer", example: 0},

                }

            },

            NewCottage:{

                type: "object",
            
                properties: {

                    name: {type:"string", example:"cabaña 1"},

                    capacity: {type:"integer", example: 7},

                    pricePerNightAndPerson: {type:"integer", example: 40000},

                    location: {type:"string", example: "tafi viejo, tucuman"},

                    description: {type:"string", example: "un lugar para descansar en contacto con la naturaleza"},

                    image: {type:"string", format: "link", example: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/cottageImagesBucket/1793423330630-kpyhd1.jpg"},
                    
                }

            },

            NewContact:{

                type: "object",
            
                properties: {

                    reasonOfContact: {type: "string", example: "problem"},

                    contactComment: {type: "string", example: "Hi 123C"},

                }

            },
            
            NewNaturalElement:{

                type: "object",
            
                properties: {

                    name: {type:"string", description: "Esto es para la flora y fauna local", example:"Tusca"},

                    binomialName: {type:"string", description: "Esto es para la flora y fauna local", example:"Vachellia aroma"},

                    description: {type:"string", example: "arbol perteneciente a la familia de las acacias que se ubica en el territorio argentino."},

                    image: {type:"string", format: "link", example: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/naturalElementsImagesBucket/1793165770889-vqf2g6.jpg"},

                    info: {type:"string", format: "link", example: "https://es.wikipedia.org/wiki/Vachellia_aroma"},

                }

            },

            NewReservation:{

                type: "object",
            
                properties: {

                    cottage: { $ref: "#/components/schemas/Cottage", description: "El usuario tiene que escribir la cabaña. En el front, habría que seleccionarla a través de un select" },

                    entryDate: {type:"string", format: "date", example: "2026-11-12"},

                    exitDate: {type:"string", format: "date", example: "2026-11-15"},

                    passengerNumber: {type:"integer", description:"El que hace la reservación está incluido al ser almacenado en la base de datos, pero no al enviar la solicitud.", example: 3},

                    methodOfPayment: {type: "string", example: "bankTransfer"},

                }
                },

                Register:{
        
                    type: "object",
        
                    properties: {
        
                        name: {type:"string", example:"Luis"},
        
                        surname: {type:"string", example:"Pérez"},
        
                        birthDate: {type:"string", format: "date-time", example:"1999-12-31T00:00:00.000Z"},
        
                        phoneNumber: {type:"string",  example:"+5491333567896"},
        
                        email: {type:"string", format: "email",  example:"luis.perez@gmail.com"},
        
                        password: {type:"string", example:"LuisPerez123"},
        
                    }
                },
        
                Login:{
        
                    type: "object",
        
                    properties: {
        
                        email: {type:"string", format: "email", unique: true, example:"luis.perez@gmail.com"},
        
                        password: {type:"string", example:"LuisPerez123"}
                    }
        
                },
        
                Profile:{
        
                    type: "object",
        
                    properties: {
        
                        _id: {type:"string", format:"ObjectId", example:"6ae9560a22a36af0e70d1a69"},
        
                        name: {type:"string", example:"Luis"},
        
                        surname: {type:"string", example:"Pérez"},
        
                        birthDate: {type:"string", format: "date-time", example:"1999-12-31T00:00:00.000Z"},
        
                        phoneNumber: {type:"string", example:"+5491333567896"},
        
                        email: {type:"string", format: "email", example:"luis.perez@gmail.com"},
                        
                        role: {type:"string", example:"user"},
        
                        createdAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},
        
                        updatedAt: {type:"string", format: "date-time", example:"2026-11-03T03:33:30.103Z"},
                    }
        
                },




        },     



        },

    }

export const specifications = swaggerJsdoc({

    definition: definition,

    apis: ["./src/routes/*.js"],

})