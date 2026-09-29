import express from "express";
import cors from "cors"
import { handleError } from "../middlewares/handleError.js"
import { PORT } from "../utils/config.js"
import { connectDB } from "./db.js";
import userRoutes from "./routes/userRoutes.js";

// Conexión a la DB

const app = express()

await connectDB()

// Uso y lectura de CORS

    // Permitir todas las conexiones

    app.use(cors());

    // O configurar específicamente

    app.use(cors({
    origin: "http://localhost:5173",  // Solo permitir este origen (React)

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    credentials: true  // Permitir cookies
    }));

// Middlewares a nivel global

    app.use(express.json())

    app.use(express.urlencoded({ extended: true }))

    app.use(handleError)

 // Rutas de Negocio

        // Ruta de pruebas

        app.get("/", (req, res) => {

        res.send("The server is working correctly");

        });
    
        // Ruta de usuarios

        app.use("/api/user", userRoutes)

// Autenticación

// Error 404

    app.use( (req, res) => {

        res.status(404).json( {error: "This route does not exist"} )

    })

// PORT y Visualización

    app.listen(PORT, () => {

            console.log(`Server working on http://localhost:${PORT}`);
            console.log(`Route of Users on http://localhost:${PORT}/api/user`)
    })