import dotenv  from "dotenv"

const config = dotenv.config()

// Eliminación del OR (||) por motivos de seguridad

export const PORT = process.env.PORT 

export const MONGO_URI = process.env.MONGO_URI 

export const ITERATIONS = Number(process.env.ITERATIONS) // ITERATIONS debe ser un número, no un texto plano

export const JWT_SECRET = process.env.JWT_SECRET

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

export const STORAGE = process.env.STORAGE

export const IMAGES_FOLDER = process.env.IMAGES_FOLDER

export const SUPABASE_URL = process.env.SUPABASE_URL

export const SUPABASE_KEY = process.env.SUPABASE_KEY
