// models

    // naturalElement

        export const binomialNameRegex =  /^[A-Z][a-z]+ [a-z]+(?: [a-z]+)?$/
        // Se asegura de que el string tenga dos palabras, la primera en mayúscula y la segunda en minúscula y una tercera (opcional) como los nombres de nomenclatura binomial, excluyendo la Ñ y las tildes. Otra solución sería crear un enum con todas las especies existentes con nomenclatura binomial

        export const validDomainRegex = /^http(s)?:\/\/(localhost|[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?([/?#]\S*)?$/;

/**
 * EXPLICACIÓN DETALLADA PASO A PASO:
 * 
 *  ^              -> INICIO: Obliga a que la cadena empiece exactamente en este punto.
 * 
 *  http(s)?       -> PROTOCOLO: Busca la palabra 'http'. El grupo '(s)?' indica que 
 *                    la 's' es opcional. Por lo tanto, acepta tanto "http" como "https".
 * 
 *  :\/\/          -> SEPARADOR: Busca los caracteres "://". Se usa la barra invertida '\' 
 *                    para escapar las barras '/' y que no se confundan con el cierre de la regex.
 * 
 *  (              -> INICIO GRUPO DE DOMINIO: Agrupa las dos opciones de nombres de servidor.
 * 
 *     localhost   -> OPCIÓN A: Coincide exactamente con la palabra "localhost".
 *     |           -> OPERADOR OR: Funciona como un "o" lógico. Si no es localhost, evalúa lo siguiente.
 *     [a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+ 
 *                 -> OPCIÓN B (Dominio clásico): 
 *                    - [a-zA-Z0-9-]+ : Uno o más caracteres alfanuméricos o guiones (ej: "google" o "mi-web").
 *                    - (\.[a-zA-Z0-9-]+)+ : Un punto seguido de caracteres (ej: ".com"). El '+' del final 
 *                      permite que se repita para subdominios o extensiones compuestas (ej: ".co.uk").
 * 
 *  )              -> FIN GRUPO DE DOMINIO.
 * 
 *  (:\d+)?        -> PUERTO (Opcional): El signo '?' al final hace que todo este grupo sea opcional.
 *                    Si existe, busca dos puntos ':' seguidos de uno o más dígitos '\d+' (ej: ":3000" o ":8080").
 * 
 *  ([/?#]\S*)?    -> RUTA / PARÁMETROS (Opcional): El '?' final lo hace opcional. Si existe, busca 
 *                    que empiece por una barra '/', un signo de interrogación '?' o un hashtag '#'.
 *                    El '\S*' significa "cualquier carácter que NO sea un espacio", capturando toda la 
 *                    ruta y variables hasta el final (ej: "/dashboard?user=123#profile").
 * 
 *  $              -> FIN: Obliga a que la cadena termine aquí, evitando que haya texto extra inválido después.
 * 
 */