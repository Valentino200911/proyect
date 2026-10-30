import express from "express";
import cors from "cors"
import { PORT, STORAGE_LOCAL } from "../utils/config.js"
import { connectDB } from "./db.js";
import naturalElementRoutes from "./routes/naturalElementRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import cottageRoutes from "./routes/cottageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { handleError } from "./middlewares/handleError.js";

const app = express()

// Conexión a la DB

    await connectDB()

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

// PORT y Visualización

    app.listen(PORT, () => {

        console.log(`Server working on http://localhost:${PORT}`);
        console.log(`Route of Natural Elements on http://localhost:${PORT}/api/naturalelement`)
        console.log(`Route of Users on http://localhost:${PORT}/api/user`)
        console.log(`Route of Cottages on http://localhost:${PORT}/api/cottage`)
        console.log(`Route of Contacts on http://localhost:${PORT}/api/contact`)
        console.log(`Route of Auth on http://localhost:${PORT}/api/auth`)

    })