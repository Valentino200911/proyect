import { supabase } from "../../config/supabase.js";
import { IMAGES_FOLDER_NATURAL_ELEMENT, IMAGES_FOLDER_COTTAGE} from "../../../utils/config.js";
import { uniqueName } from "../../../utils/uniqueName.js";

const bucket =  (FOLDER) => { // Debido a que hay múltiples carpetas en SUPABASE, se requiere un param con validación
    
    const supabaseFolder = supabase.storage.from(FOLDER)

    if (!FOLDER) {
        
        throw new Error("There has been an error with the SUPABASE folder");
        
    }

    return supabaseFolder
}

export const uploadSupabase = async (file, FOLDER) => { // FOLDER = Selección de la carpeta a exportar

    const name = uniqueName(file.originalname)
    
    const { error } = await bucket(FOLDER).upload(name, file.buffer, {

        contentType: file.mimetype,
        upsert: false

    })

    if(error){

        throw error;
        
    }

    // Arma la url --> bucket público

    const { data } = bucket(FOLDER).getPublicUrl(name)

    const URL = data.publicUrl

    return URL

}

export const eraseSupabase = async (url, FOLDER) => {

    // La URL pública termina en .../object/public/<bucket>/<archivo>

    const name = url.split(`/${FOLDER}/`).pop()

    if (!name || name === url) return    // no parece una URL nuestra

    const { error } = await bucket(FOLDER).remove([name])    // remove espera un ARRAY

    if(error){

        throw error
        
    }
}
