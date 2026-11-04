import { ErrorApp } from "../ErrorApp.js";

// models

    // naturalElement

        export const binomialNameRegex =  /^[A-Z][a-z]+ [a-z]+(?: [a-z]+)?$/
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

        export const passwordDigits = 8 // Dígitos mínimos de las contraseñas

    // cottage

        export const LOCATION = Object.freeze({

            TAFI_VIEJO_TUCUMAN: "tafi viejo, tucuman" // Se emplea un enum en caso de que se añadan nuevas ubicaciones

        })

    // contact

        export const REASON_OF_CONTACT = Object.freeze({

            BUSINESS: "business",
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

        export const reservationMaxDays = 7 // Validar que las reservacuiones no superen los 7 días

        export const personWhoReserves = 1 // Siempre va a ser así, la PERSONA que hace la reservación NO tiene que incluirse a sí misma, el propio sistema la incluye desde aquí

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
    

        export const parseToLocalDate = function (date) { // Parsea el string en un formato distinto, para que al volverse dato tipo DATE, se mantenga en UTC -3
            
            if (date instanceof Date) {
                
                return date
    
            }
    
            if (!date || typeof date !== "string") {
                
                return null
    
            }
    
            // Reemplazar '-' por '/' fuerza a JS a interpretar la fecha en horario local, no en UTC puro

            const parsedDate = date.replace(/-/g, '/')
            
            const returnedDate = new Date(parsedDate)
            
            return returnedDate
            
        }
        
        export const parseToNumber = function (params) {
            
            if (typeof params === "number" && !Number.isNaN(params)) { // Si es un número, retorno directo
                
                return params

            }

            let value

            if (typeof params === "string" && params.trim() === "") { // Valida los strings vacíos

                throw new ErrorApp(`The provided param is invalid (${params})`, 400);

            }

            value = Number(params)

            if (Number.isNaN(value)) { // Valida que el resultado sea un número
                
                throw new ErrorApp(`The returned value is invalid (${value})`, 400);

            }
        
            return value

        }

        export const addDays = function (date, addedDays) { // addedDays son Días que se suman
        
                let daysToAdd
                
                if (typeof addedDays !== "number") {
                    
                    daysToAdd = parseToNumber(addedDays)
    
                } else {

                    daysToAdd = addedDays

                }
                
                let sentDate
    
                if (date instanceof Date) {
                    
                    sentDate = date
    
                } else {
    
                    sentDate = parseToLocalDate(date)
    
                }
    
                if (!sentDate || isNaN(sentDate.getTime())) {
    
                    throw new ErrorApp(`The provided date is invalid`, 400);
                    
                }
    
                const definedDate = new Date(sentDate.getTime());
    
                definedDate.setDate(definedDate.getDate() + daysToAdd);
    
                return definedDate
        
            }
        
        export const formatDate = function (date) { // Esto evita que el usuario deba ver una larga cadena de fechas
            
            let toFormatDate

            if (date instanceof Date) {
                
                toFormatDate = date

            } else {

                toFormatDate = parseToLocalDate(date)

            }

            const formatedDate = toFormatDate.toISOString().split("T")[0]

            return formatedDate

        }

        
    // contactService

        export const POPULATE_CONTACT = [

            {
                path: "user",
                select: "name surname phoneNumber email"
            },
        ]
