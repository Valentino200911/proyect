import express from "express";
import cors from "cors"
import { handleError } from "../middlewares/handleError.js"
import { PORT } from "../utils/config.js"
import { connectDB } from "./db.js";

// Conexión a la DB

await connectDB()

const app = express()

// Uso y lectura de CORS
app.use(cors)

// Lectura de JSON
app.use(express.json())

// Routes

// Autenticación

// Rutas de Negocio

// Error 404

    app.use( (req, res) => {
        res.status(404).json( {error: "This route does not exist"} )
    })

// middlewares a nivel global

 app.use(handleError)

// PORT y Visualización

app.listen(PORT, () => {

        console.log(`Server working on http://localhost:${PORT}`);
        // console.log(`Route of --- en http://localhost:${PORT}/---`)
})