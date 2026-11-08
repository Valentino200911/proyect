// model

        export const RESERVATION_STATE = Object.freeze({

            IN_PROGRESS: "in progress",
            DONE: "done",
            FALLEN: "fallen"

        })

        export const METHOD_OF_PAYMENT = Object.freeze({

            BANK_TRANSFER: "bankTransfer",
            CASH: "cash"

        })

// service

        
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