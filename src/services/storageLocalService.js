import { STORAGE_LOCAL } from "../utils/config.js"
import { PROVIDERS } from "../utils/constants/supabaseConstants.js"
import { ErrorApp } from "../utils/ErrorApp.js"

if (!PROVIDERS.includes(STORAGE_LOCAL)) {
    
    throw new Error(`STORAGE = "${STORAGE_LOCAL}" does not exists. It has to be: ${PROVIDERS.join(", ")}`)

}

const adapter = await import(`./storage/${STORAGE_LOCAL}.js`) 

export const uploadImageLocalService = async (file, FOLDER) => {

    if (!file || !FOLDER) {
        
        return null

    }

    try {
        
        const uploading = await adapter.uploadLocal(file, FOLDER)

        return uploading

    } catch (error) {
        
        // Este catch traduce el error de un servicio EXTERNO a uno nuestro y deja el detalle técnico en el log

        // Error 500 - Internal Server Error - Problema del servidor

        console.error("Error while uploading the file:", error);
        
        throw new ErrorApp("The image could not be saved locally. Please try again", 500); // TODO: VERIFICAR SI EL MIDDLEWARE YA REVISA ESTO
        
    }

    
}

export const eraseImageLocalService = async (url, FOLDER) => {
    
    if (!url || !FOLDER)  return  
    
    try {
        
        const erasing = await adapter.eraseLocal(url, FOLDER)

        return erasing

    } catch (error) {
        
        // No se relanza el error, si la imagen no se borró, el libro queda bien, esto no le rompe la operación al usuario. Queda sólo un archivo huérfano registrado.

        console.error("Error while erasing the file:", url, error.message);
        
    }

}