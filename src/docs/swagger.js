import swaggerJsdoc from "swagger-jsdoc"
import { API_URL } from "../utils/config.js"
import { passwordDigits } from "../utils/exporter.js"

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
        
        "Para probar las rutas protegidas, ingrese a `POST api/auth/login`**, copie el `token` de la respuesta, aprete el botón **Authorize** 🔓 de arriba a la derecha y péguelo. Quedará definido para todas las rutas. Cambielo si resulta necesario.\n\n"+

         "Si aparece algún error en el login, vuelva a intentar la consulta o revise la consola de Visual Studio Code.\n\n"+

        "Para permitir la conexión a la DB específica de SWAGGER para evaluar, modifique la conexión de la MONGO_URI",

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

                        example: ["Your name is required for your account"],

                    },

                },

            },

            User: {

                type: "object",

                properties: {

                    _id: {type:"string", format:"ObjectId", example:"6ae9560a22a36af0e70d1a69"},

                    name: {type:"string", example:"Luis"},

                    surname: {type:"string", example:"Pérez"},

                    birthDate: {type:"string", format: "date", example:"1999-12-31"},

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

                    _id: {type:"string", format:"ObjectId", example:"6ae9560a22a36af0e70d1a69"},

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

            AutoModifiedUser: {

                type: "object",

                properties: {

                    name: {type:"string", example:"Pedro"},

                    surname: {type:"string", example:"Pérez"},

                    birthDate: {type:"string", format: "date", example:"1982-07-28"},

                    phoneNumber: {type:"string", unique: true, example:"+5496765553233"},

                }

            },

            NewCottage:{

                type: "object",
            
                properties: {

                    name: {type:"string", example:"cabaña 4"},

                    capacity: {type:"integer", example: 4},

                    pricePerNightAndPerson: {type:"integer", example: 30000},

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

                    cottage: { type:"string", format:"ObjectId", description: "El usuario tiene que escribir la cabaña. En el front, habría que seleccionarla a través de un select", example:"6a... (Cambie este valor con las rutas documentadas, al de una cabaña existente)" },

                    entryDate: {type:"string", format: "date", example: "2026-11-15"},

                    exitDate: {type:"string", format: "date", example: "2026-11-18"},

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
        
            Login: {
        
                    type: "object",
        
                    properties: {
        
                        email: {type:"string", format: "email", unique: true, example:"pedro.gomez@gmail.com"},
        
                        password: {type:"string", example:"Admin123"}
                    }
        
            },

            Session: {

                    type: "object",

                    properties: {

                    user: { $ref: "#/components/schemas/User" },
                    
                    token: {

                        type: "string",

                        description: "El JWT. Va en el header Authorization: Bearer <token>",
                        
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii4uLiJ9.firma",
                    },
                },
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

            ModifiedReservation:{

                type: "object",
            
                properties: {

                    reservationState: {type: "string", enum: ["in progress", "done", "fallen"], example: "done (Para user, 'fallen'; para admin 'fallen' o 'done')"},

                    isPaid: {type: "boolean (Si el rol es 'user', eliminar este campo)", example: true, enum: [true, false]},

                    reservationComment: {type: "string", nullable: true, example: "Hi 123R (Si el rol es 'admin', eliminar este campo)"},

                }

                },

        },     

        parameters: {

            IdInRoute: {

                name: "id",

                in: "path",

                required: true,

                description: " _id definido en MongoDB (24 caracteres hexadecimales)",

                schema: { type: "string", example: "68f1a2b3c4d5e6f701234568" },

            },

        },

        responses: {

            TokenError: {

                description: "Ha habido un error con el token: Es inválido, ha vencido o no fue escrito",

                content: {

                    "application/json": {

                        schema: { $ref: "#/components/schemas/Error" },

                        example: { error: "There has been an error with the token" },

                    },
                },
            },

            Forbidden: {

                description: "Has sido identificado por tu rol, pero no tienes los permisos suficientes pasra realizar esta acción",

                content: {

                    "application/json": {

                        schema: { $ref: "#/components/schemas/Error" },

                        example: { error: "This action requires the role: 'admin'" },

                    },

                },

            },

            NotFound: {

                description: "El elemento requerido no fue encontrado o podría no existir",

                content: {

                    "application/json": {

                        schema: { $ref: "#/components/schemas/Error" },

                        example: { error: "The user with the _id 68f1a2b3c4d5e6f701234568 does not exist" },

                    },

                },

            },

            InvalidData: {

                description: "El _id o el body no son válidos. CastError",

                content: {

                    "application/json": {

                        schema: { $ref: "#/components/schemas/ValidationError" },

                    },
                },
            },

            Conflict: {

                description: "La acción es correcta pero no está permitida por reglas del sistema",

                content: {

                    "application/json": {

                        schema: { $ref: "#/components/schemas/Error" },

                        example: { error: 'The user cannot be deleted becuase it has registered 2 contacts and 3 reservations' },

                    },

    }

}
}
}
} // video en 2:04:09

export const specifications = swaggerJsdoc({

    definition: definition,

    apis: ["./src/routes/*.js"],

})