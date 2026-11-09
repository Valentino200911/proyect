import { ErrorApp } from "../ErrorApp.js";

// Parseo a Number

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