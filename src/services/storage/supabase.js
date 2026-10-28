import { supabase } from "../../config/supabase.js";
import { IMAGES_FOLDER } from "../../../utils/config.js";
import { uniqueName } from "./uniqueName.js";

const bucket =  () => {
    
    supabase.storage.from(IMAGES_FOLDER)

}

export const upload = async (file) => {
    
    const name = uniqueName(file.originalname)

    const { error } = await bucket().upload(name, file.buffer, {

        contentType: file.mimetype,
        upsert: false

    })

    if(error){

        throw error;
        
    }

    // Arma la url --> bucket público

    const { data } = bucket().getPublicUrl(name)

    const URL = data.publicUrl

    return URL

}

