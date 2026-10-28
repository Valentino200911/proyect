import dotenv  from "dotenv"

const config = dotenv.config()

// Eliminación del OR (||) por motivos de seguridad

export const PORT = process.env.PORT 

export const MONGO_URI = process.env.MONGO_URI 

export const API_URL = process.env.API_URL

export const ITERATIONS = Number(process.env.ITERATIONS) // ITERATIONS debe ser un número, no un texto plano

export const JWT_SECRET = process.env.JWT_SECRET

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

export const STORAGE_SUPABASE = process.env.STORAGE_SUPABASE

export const STORAGE_LOCAL = process.env.STORAGE_LOCAL

export const IMAGES_FOLDER_NATURAL_ELEMENT = process.env.IMAGES_FOLDER_NATURAL_ELEMENT

export const IMAGES_FOLDER_COTTAGE = process.env.IMAGES_FOLDER_COTTAGE

export const SUPABASE_URL = process.env.SUPABASE_URL

export const SUPABASE_KEY = process.env.SUPABASE_KEY
