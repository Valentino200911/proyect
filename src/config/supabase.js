import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "../../utils/config.js";

if (!SUPABASE_URL || !SUPABASE_KEY) {
    
    throw new Error("There has been an error with the variables, verify SUPABASE");
    
}

// Conexión viva con el sistema externa

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


