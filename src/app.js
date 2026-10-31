import express from "express";
import cors from "cors"
import naturalElementRoutes from "./routes/naturalElementRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import cottageRoutes from "./routes/cottageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { handleError } from "./middlewares/handleError.js";
import { PORT, STORAGE_LOCAL } from "./utils/config.js";

export const app = express()

// Local storage

app.use(`/${STORAGE_LOCAL}`, express.static(STORAGE_LOCAL))

// Uso y lectura de CORS

    // configurar específicamente

app.use(cors({

    origin: "http://localhost:5173",  // Solo permitir este origen (React)

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    credentials: true  // Permitir cookies

}));

// Operaciones a nivel global

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Ruta de pruebas

app.get("/", (req, res) => {
    
    res.send("The server is working correctly");
    
});

// Rutas de Autenticación

app.use("/api/auth", authRoutes)

// Rutas de Negocio

    // Ruta de NaturalElement

    app.use("/api/naturalelement", naturalElementRoutes)

    // Ruta de Usuarios

    app.use("/api/user", userRoutes)

    // Ruta de Cottages

    app.use("/api/cottage", cottageRoutes)

    // Ruta de Contacts

    app.use("/api/contact", contactRoutes)

    // Ruta de Reservations

    app.use("/api/reservation", reservationRoutes)

    
    // Error 404
    
    app.use((req, res) => {
        
        res.status(404).json({ error: "This route does not exist" })
        
    })
    
// Middlewares a nivel global
    
    app.use(handleError)

