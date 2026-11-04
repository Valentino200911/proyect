import { ErrorApp } from "../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";
import User from "../models/userModel.js";
import Reservation from "../models/reservationModel.js";
import { addDays, formatDate, parseToLocalDate, parseToNumber, personWhoReserves, POPULATE_RESERVATION, reservationMaxDays } from "../utils/constants/generalConstants.js";

// Validar la reservación y aplicar lógica de negocio

// Validaciones necesarias

const validateCapacity = async (reservation) => {

    const capacity = parseToNumber(reservation.cottage.capacity)

    const passangerNumber = parseToNumber(reservation.passangerNumber) + personWhoReserves /// Se suma "personWhoReserves" debido a que se incluye a la propia persona que reserva

    if (passangerNumber > capacity) {

        throw new ErrorApp(`The number of people (${passangerNumber}, you are included) cannot be over the cottage's capacity (${capacity})`, 409);

    }
}

const validateDate =  (reservation) => { 

    const entryDate = parseToLocalDate(reservation.entryDate)

    const exitDate = parseToLocalDate(reservation.exitDate)

    const today = new Date() // Fecha de hoy
    
    today.setHours(0,0,0,0) // Medianoche
    
    if (entryDate < today || exitDate < today) {
        
        throw new ErrorApp("The reservation cannot be made in the past. Check your dates again", 400);
        
        
    }

    if (entryDate >= exitDate) {
        
        throw new ErrorApp(`The date of entry (${formatDate(entryDate)} cannot be over or be same as the date of exit (${formatDate(exitDate)})`, 409);
        
    } 

    const restrictedExitDate =  addDays(entryDate, reservationMaxDays)

    if (exitDate > restrictedExitDate) {
    
        throw new ErrorApp(`The date of exit (${formatDate(exitDate)}) cannot be over ${reservationMaxDays} days after the entry date. The maximum allowed for ${formatDate(entryDate)} is ${formatDate(restrictedExitDate)}`, 409)

    }

}

const validateDateSuperposition = async (reservation) => {

    const cottageId = reservation.cottage._id || reservation.cottage
    
    const entryDate = parseToLocalDate(reservation.entryDate)
    
    const exitDate = parseToLocalDate(reservation.exitDate)

    // Límites, para que siempre haya un día entre medio de múltples reservaciones

    const entryLimit = addDays(entryDate, -2) // Para que, por ej. Si hay una reservación iniciada el 13, exitDate no pueda ser el 12
    
    const exitLimit = addDays(exitDate, 2) // Para que, por ej. Si hay una reservación finalizada el 13, entryDate no pueda ser el 14

    const existentReservations = await Reservation.findOne(

        { cottage:  cottageId, 
            
            $and: [

                { entryDate: { $lt: exitLimit } }, 
                { exitDate: { $gt: entryLimit } }

            ] 

        }
    )

    if (existentReservations) {

        throw new ErrorApp(`There is a reservation near those dates or, there is a day reserved for mantaining the cottages`, 409);

    }
    
}

// Traer la reservación 

const verifyIfReservationExistsService = async (reservationId) => {

    const reservation = await Reservation.findById({ _id: reservationId })

    if (!reservation) {

        throw new ErrorApp(`The reservation "${reservationId}" does not exist`, 404);

    }

    return reservation

}

const reservationData = async (reservation) => {

    const user = await User.findById(reservation.user)

    const cottage = await Cottage.findById(reservation.cottage)

    const entryDate = new Date(reservation.entryDate)

    const exitDate = new Date(reservation.exitDate)

    if (!cottage || !user) {

        throw new ErrorApp("There is a cottage or an user that does not exist", 404);

    }

    return {
        user: user,
        cottage: cottage,
        entryDate: reservation.entryDate,
        exitDate: reservation.exitDate,
        passangerNumber: parseToNumber(reservation.passangerNumber) + personWhoReserves, // Se suma "personWhoReserves" debido a que se incluye a la propia persona que reserva
        totalPrice: (cottage.pricePerNightAndPerson * (parseToNumber(reservation.passangerNumber) + personWhoReserves) * Math.round((exitDate - entryDate) / 86400000)), // Se suma "personWhoReserves" debido a que se incluye a la propia persona que reserva
        reservationState: reservation.reservationState,
        methodOfPayment: reservation.methodOfPayment,
        isPaid: reservation.isPaid,
        reservationComment: reservation.reservationComment

    }

}

// getAllReservationsService (Todos)

export const getAllReservationsService = async (userId = null) => {

/*

Esto funciona de la siguiente manera:

En getAllReservationsService y getReservationByIdService (lo mismo aplica para las operaciones análogas en contact), el campo userId es opcional (por eso es = null), eso quiere decir que la función puede o no recibirlo.

Dado a que existen tokens de user y admin, técnicamente siempre están siendo recibidos

Ahora, para que eso aplique, se crea una const filter = {}, y se definbe que si hay userId (o es userId !== null), entonces que al objeto filter se le agregue la propiedad user: userId

Este filter se usa luego en las consultas de find y findOne (la razón por la cual se usa findOne en getReservationByIdService en vez de findById es porque esta sólo admite un _id y ningún otro campo. En cambio findOne admite múltiples condiciones, lo cual es el caso si userId !== null)

Definido esto, se pasa al controller donde, si hay userId, se determina su rol a través de const role = req.user.role

Si role === "admin", entonces se devolverán todos los registros (o uno en específico) sin importar quién sea el usuario

Si role !== "admin", solo se devolverán los registros del usuario a quien le pertenezca el token, y si intenta obtener por id una reservación que no es suya, aplicará en el service:

    const reservation = await Reservation.findOne(filter, { __v: 0 }).populate(POPULATE_RESERVATION)

    if (!reservation) {
        
        throw new ErrorApp("The reservation does not exist or you do not have access to it", 400);

    }

    Por convención se empleó al 400 - bad request como salida, pero la validación también puede admitir un 404, es decir, que  no haya reservation en específico o, en todo caso, un 403, forbidden
*/

    const filter = {}

    if (userId !== null) {
        
        filter.user = userId
    }

    const reservation = await Reservation.find(filter, { __v: 0 }).populate(POPULATE_RESERVATION).sort({ createdAt: -1 })

    return reservation
}

// getReservationByIdService - Uno en específico que bien puede ser mío (userOnly) o no (adminOnly)

export const getReservationByIdService = async (reservationId, userId = null) => { // El null viene por default en caso de que no se lo envíe

    const filter = {_id: reservationId }

    if (userId !== null) {
        
      filter.user = userId

    }

    const reservation = await Reservation.findOne(filter, { __v: 0 }).populate(POPULATE_RESERVATION)

    if (!reservation) {
        
        throw new ErrorApp("The reservation does not exist or you do not have access to it", 400);

    }

    return reservation
}

// createReservationService

export const createReservationService = async (userId, cottageId, data) => {

    data.user = userId

    data.cottage = cottageId

    const reservation = await reservationData(data)

    const dateValidation = await validateDate(reservation)

    const dateSuperpostionValidation = await validateDateSuperposition(reservation)

    const capacityValidation = await validateCapacity(reservation)

    const newReservation = await Reservation.create(reservation)

    const populatedReservation = await newReservation.populate(POPULATE_RESERVATION)

    return populatedReservation

}

// updateReservationService

export const updateReservationService = async (reservationId, { reservationState, isPaid, reservationComment } = {}) => {

    const updatedReservation = await Reservation.findByIdAndUpdate({ _id: reservationId }, { reservationState, isPaid, reservationComment }, {

        returnDocument: "after",

        runValidators: true,

    }
    ).populate(POPULATE_RESERVATION)

/*

- Si isPaid pasa de false a true, y reservationState es "in progress", entonces reservationState se vuelve "done"

- Si isPaid es true y se vuelve false, y además reservationState  es "done", se vuelve "fallen"

- TODO: Encontrar una manera de que si una reservación es "in progress" por mucho tiempo se vuelva fallen

- Una reservación cuyo reservationState: "in progress" puede modificarse manualmente p/ que sea  "fallen" (pero no al revés), mas no "done"

*/

    if (!updatedReservation) { // No la encuentra, early return
        
        throw new ErrorApp(`The reservation with the id ${reservationId} does not exist`, 404);        
    
    }

    if (updatedReservation.isPaid === true) { // Tiene false como default, pasa a true, entonces la reservación está pagada
        
        updatedReservation.reservationState = "done"

    } 

    if (updatedReservation.isPaid === false) { // Si por x motivo el pago no era cierto, pasa a ser fallen
        
        updatedReservation.reservationState = "fallen" 

    } 

    return updatedReservation

}

// deleteReservationService (adminOnly) - Analizar la lógica de negocio:

/*

¿Conviene que el usuario pueda eliminar la reservación?

*/

export const deleteReservationService = async (reservationId) => {
    
    const reservation = await Reservation.findByIdAndDelete({_id: reservationId})

    if (!reservation) {
        
        throw new ErrorApp(`The reservation with the id ${reservationId} does not exist`, 404);        

    }

    return reservation.populate(POPULATE_RESERVATION)
}
