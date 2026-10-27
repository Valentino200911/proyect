import { ErrorApp } from "../../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";
import User from "../models/userModel.js";
import Reservation from "../models/reservationModel.js";
import { parseToLocalDate, POPULATE_RESERVATION } from "../../utils/constants/generalConstants.js";

// Validar la reservación y aplicar lógica de negocio

// Validaciones necesarias

const validateCapacity = async (reservation) => {

    const capacity = reservation.cottage.capacity

    const passangerNumber = reservation.passangerNumber + 1 //El +1 proviene de la propia persona que reserva

    if (passangerNumber > capacity) {

        throw new ErrorApp(`The number of people (${passangerNumber}) cannot be over the cottage's capacity (${capacity})`, 409);

    }
}

const validateDate =  (reservation) => { 

    const entryDate = reservation.entryDate

    const exitDate = reservation.exitDate

    // Validar que las reservacuiones no superen los 7 días

    const addedDays = 7 // Días que se suman

    function addDays() {

        const duplicatedEntryDate = new Date(entryDate)

        const result = duplicatedEntryDate.setDate(duplicatedEntryDate.getDate() + addedDays)

        return result

    }

    const restrictedExitDate = addDays()

    if (entryDate >= exitDate) {

        throw new ErrorApp(`The date of entry (${entryDate}) cannot be over or be same as the date of exit (${exitDate})`, 409);

    } else {

        if (exitDate > restrictedExitDate) {
    
            throw new ErrorApp(`The date of exit (${exitDate}) cannot be over ${addedDays} days after the entry date. The maximum allowed for ${entryDate} is ${restrictedExitDate}`, 409)

        }

    }

}

const validateDateSuperposition = async (reservation) => {

    const entryDate = parseToLocalDate(reservation.entryDate)

    const exitDate = parseToLocalDate(reservation.exitDate)

    const existentReservations = await Reservation.findOne({ cottage:  reservation.cottage._id, $and: [{ entryDate: { $lt: exitDate } }, { exitDate: { $gt: entryDate } }] })

    if (existentReservations) {

        throw new ErrorApp(`There is a conflict with a reservation on the dates: ${entryDate} to ${exitDate}`, 409);

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
        passangerNumber: reservation.passangerNumber,
        totalPrice: (cottage.pricePerNightAndPerson * (reservation.passangerNumber + 1) * Math.round((exitDate - entryDate) / 86400000)), // Se suma +1 debido a que se incluye a la propia persona que reserva
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
        
        throw new ErrorApp("The reservation does not exist or you do not have access to it", 403);

    }

    Por convención se empleó al 403 - forbidden como salida, pero la validación también puede admitir un 404, es decir, que  no haya reservation en específico

*/

    const filter = {}

    if (userId !== null) {
        
        filter.user = userId
    }

    return await Reservation.find(filter, { __v: 0 }).populate(POPULATE_RESERVATION).sort({ createdAt: -1 })

}

// getReservationByIdService - Uno en específico que bien puede ser mío (userOnly) o no (adminOnly)

export const getReservationByIdService = async (reservationId, userId = null) => { // El null viene por default en caso de que no se lo envíe

    const filter = {_id: reservationId }

    if (userId !== null) {
        
      filter.user = userId

    }

    const reservation = await Reservation.findOne(filter, { __v: 0 }).populate(POPULATE_RESERVATION)

    if (!reservation) {
        
        throw new ErrorApp("The reservation does not exist or you do not have access to it", 403);

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

    return await newReservation.populate(POPULATE_RESERVATION)

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
