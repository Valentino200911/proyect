import swaggerJsdoc from "swagger-jsdoc"
import { API_URL } from "../utils/config.js"

const definition = {

    openapi: "3.0.3",                 // la versión del ESTÁNDAR, no la de nuestra API

    info: {
        title: "API Cabañas Aguaribay",
        version: "1.0.0",
        description: "API de Cabañas Aguaribay - Manejo de Usuarios, Reservaciones, Cabañas, Contactos y Elementos de la Naturaleza. \n\n" + "**Para probar las rutas protegidas, ingrese a `POST api/auth/login`" +
            "copiá el `token` de la respuesta, apretá el botón **Authorize** 🔓 de " +
            "arriba a la derecha y pegalo. Queda puesto para todas las rutas.",
        contact: { email: "valenvalvo@gmail.com" }
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
    },

    schemas: {
        // ── errores ────────────────────────────────────────────
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
    





    },


}

export const specifications = swaggerJsdoc({

    definition: definition,

    apis: ["./src/routes/*.js"],

})