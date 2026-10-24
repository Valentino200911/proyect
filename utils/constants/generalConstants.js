
// models

    // naturalElement

        export const binomialNameRegex = /^[A-Z][a-z]+ [a-z]+$/
        // Se asegura de que el string tenga dos palabras, la primera en mayúscula y la segunda en minúscula y una tercera (opcional) como los nombres de nomenclatura binomial, excluyendo la Ñ y las tildes. Otra solución sería crear un enum con todas las especies existentes con nomenclatura binomial

        export const validDomainRegex = /^https:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#]\S*)?$/

        // ^https:\/\/ : Obliga a que la cadena empiece exactamente con https://. Las barras / se escapan con una barra invertida \/ para que JS no las confunda con el cierre de la regex.

        // [a-zA-Z0-9-]+ : Valida el primer fragmento del dominio (admite letras, números y guiones).

        // (\.[a-zA-Z0-9-]+)+ : Exige obligatoriamente el punto seguido de la extensión del dominio (como .com, .org o subdominios como .com.ar). El + del final permite que haya múltiples extensiones o subdominios.

        // ([/?#]\S*)? : Hace que todo el resto de la URL sea opcional (?). Si el usuario pone una barra /, un signo de pregunta ? o un numeral #, este bloque permite cualquier carácter que no sea un espacio en blanco (\S*).

    // user

        export const ROLES = Object.freeze({
            ADMIN: "admin",
            USER: "user",
        });

        export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        // Validación del número teléfono bajo el formato número de caracteres que posee

        export const phoneNumberRegex = /^\+\d{1,15}$/;


    // cottage

        export const LOCATION = Object.freeze({

            TAFI_VIEJO_TUCUMAN: "tafi viejo, tucuman" // Se emplea un enum en caso de que se añadan nuevas ubicaciones

        })

    // contact

        export const REASON_OF_CONTACT = Object.freeze({
            ADMIN: "business",
            USER: "prom",
            PROM: "prom",
            PROBLEM: "problem",
            SUGGESTION: "suggestion"
        });

    // reservation

        export const RESERVATION_STATE = Object.freeze({

            IN_PROGRESS: "in progress",
            DONE: "done",
            FALLEN: "fallen"

        })

        export const METHOD_OF_PAYMENT = Object.freeze({

            BANK_TRANSFER: "bankTransfer",
            CASH: "cash"

        })

//services

    //reservationService

        export const POPULATE_RESERVATION = [

            {
                path: "user",
                select: "name surname phoneNumber email"
            },
            {
                path: "cottage",
                select: "name capacity pricePerNightAndPerson"
            }
        ]
    
    // contactService

        export const POPULATE_CONTACT = [

            {
                path: "user",
                select: "name surname phoneNumber email"
            },
        ]

        
        