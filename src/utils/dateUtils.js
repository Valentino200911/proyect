import { ErrorApp } from "./ErrorApp.js"

// Parseo a tipo Date

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