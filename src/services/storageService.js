import { STORAGE_LOCAL, STORAGE_SUPABASE } from "../../utils/config.js";
import { ErrorApp } from "../../utils/ErrorApp.js";
import { uploadSupabase, eraseSupabase } from "./storage/supabase.js";

const PROVIDERS = [STORAGE_LOCAL, STORAGE_SUPABASE]

if (!PROVIDERS.includes(STORAGE_SUPABASE)) {
    
    throw new Error(`STORAGE = "${STORAGE_SUPABASE}" does not exists. It has to be: ${PROVIDERS.join(", ")}`)

}

const adapter = await import(`./storage/${STORAGE_SUPABASE || STORAGE_LOCAL}.js`)

export const uploadImageService = async (file, FOLDER) => {

    if (!file || !FOLDER) {
        
        return null

    }

    try {
        
        return await adapter.uploadSupabase(file, FOLDER)

    } catch (error) {
        
        // Este catch traduce el error de un servicio EXTERNO a uno nuestro y deja el detalle técnico en el log

        // Error 502 - Bad Gateway - Falló un servicio del que el servidor depende, pero no fue culpa ni del user ni del server

        console.error("Error while uploading the file:", error);
        
        throw new ErrorApp("The image could not be saved. Please try again", 502);
        

    }

    
}

export const eraseImageService = async (url, FOLDER) => {
    
    if (!url || !FOLDER)  return  
    
    try {
        
        return await adapter.eraseSupabase(url, FOLDER)

    } catch (error) {
        
        // No se relanza el error, si la imagen no se borró, el libro queda bien, esto no le rompe la operación al usuario. Queda sólo un archivo huérfano registrado.

        console.error("Error while erasing the file:", url, error.message);
        
    }

}