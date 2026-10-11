import dotenv  from "dotenv"

const config = dotenv.config()

// Eliminación del OR (||) por motivos de seguridad

export const PORT = process.env.PORT 

export const MONGO_URI = process.env.MONGO_URI 

export const ITERATIONS = Number(process.env.ITERATIONS) // ITERATIONS debe ser un número

export const JWT_SECRET = process.env.JWT_SECRET

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
