
import { STORAGE_METHOD } from "../utils/config.js";
import { ErrorApp } from "../utils/ErrorApp.js";
import { PROVIDERS } from "../utils/exporter.js";

// Para modfificar el destino de exportación, cambie el valor de STORAGE_METHOD enj

if (!PROVIDERS.includes(STORAGE_METHOD)) {
    
    throw new Error(`STORAGE_METHOD = "${STORAGE_METHOD}" does not exists. It has to be: ${PROVIDERS.join(", ")}`)

}

const adapter = await import(`./storage/${STORAGE_METHOD}.js`)

export const uploadImageService = async (file, FOLDER) => {

    if (!file || !FOLDER) {
        
        return null
        
    }

    try {

        const uploading = await adapter.uploadMethod(file, FOLDER)

        return uploading

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
        
        const erasing = await adapter.eraseMethod(url, FOLDER)

        return erasing

    } catch (error) {
        
        console.error("Error while erasing the file:", url, error.message);

        throw new ErrorApp("The image could not be erased. Please try again", 502); 
        // En este caso sí se relanza el error, porque es una operación obligatoria para la existencia de los registros. Recordar que image !== null
        
    }

}