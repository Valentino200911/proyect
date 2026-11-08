import { ErrorApp } from "../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";
import User from "../models/userModel.js";
import * as userService from "../services/userService.js"
import Reservation from "../models/reservationModel.js";
import { addDays, formatDate, parseToLocalDate, parseToNumber, personWhoReserves, POPULATE_RESERVATION, RESERVATION_STATE, reservationMaxDays, ROLES } from "../utils/exporter.js";

// Validar la reservación y aplicar lógica de negocio

// Validaciones necesarias

const validateCapacity = async (reservation) => {

    const capacity = parseToNumber(reservation.cottage.capacity)

    const passengerNumber = parseToNumber(reservation.passengerNumber) // Se parsea el número, después se hace la suma

    if (passengerNumber > capacity) {

        throw new ErrorApp(`The number of people (${passengerNumber}, you are included) cannot be over the cottage's capacity (${capacity})`, 409);

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

    const entryLimit = addDays(entryDate, -2) // Para que, por ej. Si hay una reservación iniciada el 13, El exitDate de otra reservación no pueda ser el 12
    
    const exitLimit = addDays(exitDate, 2) // Para que, por ej. Si hay una reservación finalizada el 13, El entryDate de otra reservación no pueda ser el 14

    const existentReservations = await Reservation.findOne(

        { cottage:  cottageId, 
            
            $and: [

                { entryDate: { $lt: exitLimit } }, 
                
                { exitDate: { $gt: entryLimit } },

                { reservationState: {$ne: RESERVATION_STATE.FALLEN} }

            ] 

        }
    )

    if (existentReservations) {

        throw new ErrorApp(`There is a reservation during those dates or, there is a day reserved for mantaining the cottages`, 409);

    }
    
}

// Traer la reservación 

const verifyIfReservationExistsService = async (reservationId) => {

    const reservation = await Reservation.findById({ _id: reservationId }).populate(POPULATE_RESERVATION)

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

    if (!user) {

        throw new ErrorApp("The user sending this request does not exist", 404);

    }

    if (!cottage) {

        throw new ErrorApp("The cottage selected for this request does not exist", 404);

    }

    return {

        user: user,

        cottage: cottage,

        entryDate: reservation.entryDate,

        exitDate: reservation.exitDate,

        passengerNumber: parseToNumber(reservation.passengerNumber) + personWhoReserves , // Se suma "personWhoReserves" debido a que se incluye a la propia persona que reserva
        
        totalPrice: (cottage.pricePerNightAndPerson * (parseToNumber(reservation.passengerNumber) + personWhoReserves) * Math.round((exitDate - entryDate) / 86400000)), // Se suma "personWhoReserves" debido a que se incluye a la propia persona que reserva

        reservationState: reservation.reservationState,

        methodOfPayment: reservation.methodOfPayment,

        isPaid: reservation.isPaid,

        reservationComment: reservation.reservationComment

    }

}

// getAllReservationsService (Todos)

/*

Esto funciona de la siguiente manera:

En getAllReservationsService y getReservationByIdService (lo mismo aplica para las operaciones análogas en contact), el campo userId es solicitado, ya que de ahí sale la validación por rol, dado a que existen tokens de user y admin

Definido esto, Se busca al usuario por su _id, y de ahí se analiza su rol:

    - Si es admin: NO SE APLICA EL FILTRO

    - Si es user: SE APLICA EL FILTRO

        - Si el usuario de rol user no encuentra la reservación se usa un 404 en vez de un 403 para no exponer si existe o no la reservación

Ahora, para que eso aplique, se crea una const filter = {}, y se define al objeto filter se le agregue la propiedad user: userId

Este filter se usa luego en las consultas de find y findOne (la razón por la cual se usa findOne en getReservationByIdService para ROLES.USER en vez de findById es porque esta sólo admite un _id y ningún otro campo. En cambio findOne admite múltiples condiciones)


*/

export const getAllReservationsService = async (userId) => {

    const user = await userService.getUserByIdService(userId)

    const filter = {}

    filter.user = userId
    
    if (user.role === ROLES.ADMIN) {
        
        const reservation = await Reservation.find({}, { __v: 0 }).populate(POPULATE_RESERVATION).sort({ entryDate: -1 })

        return reservation

    } 
    
    if (user.role === ROLES.USER) {

        const reservation = await Reservation.find(filter, { __v: 0 }).populate(POPULATE_RESERVATION).sort({ entryDate: -1 })

        return reservation

    }

}

// getReservationByIdService - Uno en específico que bien puede ser mío (userOnly) o no (adminOnly)

export const getReservationByIdService = async (reservationId, userId) => {
    
    const user = await User.findById({_id: userId})

    const filter = {_id: reservationId}

    filter.user = userId

    if (user.role === ROLES.ADMIN) {
        
        const reservation = await verifyIfReservationExistsService(reservationId)
        
        return reservation

    } 
    
    if (user.role === ROLES.USER){

        const reservation = await Reservation.findOne(filter, {__v: 0}).populate(POPULATE_RESERVATION)

        if (!reservation) {
            
            throw new ErrorApp("The reservation that you are looking for could not exist", 404);

        }

        return reservation

    }

    }

// createReservationService

export const createReservationService = async (userId, cottageId, data) => {

    data.user = userId

    data.cottage = cottageId

    await validateDate(data)

    const reservation = await reservationData(data)

    await validateCapacity(reservation)

    await validateDateSuperposition(reservation)

    const newReservation = await Reservation.create(reservation)

    const populatedReservation = await newReservation.populate(POPULATE_RESERVATION)

    return populatedReservation

}

// updateReservationService

// Tanto el admin como el user pueden cancelar la reservación

export const updateReservationService = async (reservationId, userId, { reservationState, isPaid, reservationComment } = {}) => {

    const user = await userService.getUserByIdService(userId) // Trae al usuario (verifica de paso si existe)

    const filter = {_id: reservationId} // Filtra inicialmente los documentos por su _id

    filter.user = userId    // Se le suma el filtro del _id del usuario (para que el usuario no modifique un documento que no es suyo)

    if (user.role === ROLES.ADMIN) {
        
        const reservation = await Reservation.findById({_id: reservationId}, {}).populate(POPULATE_RESERVATION) //El admin encuentra el documento por su id, por eso es findById, al admin no necesariamente le importa de quién es el documento

        // El admin no debe modificar lo que el cliente escribió

        if (!reservation) {
            
            throw new ErrorApp(`The reservation with the _id: ${reservationId} does not exist`, 404);
            
        }

        /*

            COMPARACIÓN ENTRE VALOR DE reservationState E isPaid

            reservationState    |    isPaid

            in progress         |    false
            fallen              |    false
            done                |    true

            Además, si una reservación tiene reservationState "in progress"
            solo hay dos caminos: o se vuelve "fallen", o se vuelve "done".
            Una vez cambiado el estado no hay vuelta atrás
            
            Entonces el flujo de isPaid es:
            
            false --> false || false --> true
            
            */
        
        if (reservation.reservationState === RESERVATION_STATE.FALLEN || reservation.reservationState === RESERVATION_STATE.DONE) { // Si ya está caída o pagada ya no puede modificarse
            
            throw new ErrorApp("You cannot modify the reservation anymore", 400);
        }

        if (reservationState === RESERVATION_STATE.FALLEN && reservation.reservationState !== RESERVATION_STATE.DONE) {

            // Lo que pregunta la condición es si el cambio es para convertir en "fallen" es justamente "fallen" (cancelar la reservación), buscando además que no sea "done"

            reservation.reservationState = RESERVATION_STATE.FALLEN  // Setea el cambio

            reservation.isPaid = false  // Esta línea está como mecanismo para que isPaid se actualice de todas formas, aunque no es necesario, debido al propio flujo existente

        } 

        if (isPaid === true || reservationState === RESERVATION_STATE.DONE) { // Esto es para confirmar el pago de la reservación desde el admin, Se puede cambiar, o modificando reservationState, o modificando isPaid.
            
            reservation.isPaid = true // Setea el cambio

            reservation.reservationState = RESERVATION_STATE.DONE // Setea el cambio

        }

        await reservation.save()

        return reservation

    }  
    
    if (user.role === ROLES.USER) {

        // El rol user puede cambiar su comentario y su estado (cancelación)

        const reservation = await Reservation.findOne(filter, {}).populate(POPULATE_RESERVATION)

        if (!reservation) {
            
            throw new ErrorApp(`The reservation you are looking for could not exist`, 404);
            
        }

        if (reservation.reservationState === RESERVATION_STATE.FALLEN || reservation.reservationState === RESERVATION_STATE.DONE) {

            throw new ErrorApp("You cannot modify the reservation anymore", 400);

        }

        if (reservationState !== undefined && reservationState !== RESERVATION_STATE.FALLEN) {
            
            throw new ErrorApp("You can only cancel your reservation", 400);

        }
        // Cancelar la reservación

        if (reservationState === RESERVATION_STATE.FALLEN && reservation.reservationState !== RESERVATION_STATE.DONE) {
            
            reservation.reservationState = RESERVATION_STATE.FALLEN 

            reservation.isPaid = false

        }  

        if (reservationComment !== undefined) {
            
            reservation.reservationComment = reservationComment

        }

        await reservation.save()

        return reservation

    }

}

// deleteReservationService (adminOnly) - Analizar la lógica de negocio:

/*

¿Conviene que el usuario pueda eliminar la reservación?

*/

export const deleteReservationService = async (reservationId) => {
    
    const reservation = await Reservation.findByIdAndDelete({_id: reservationId}).populate(POPULATE_RESERVATION)

    if (!reservation) {
        
        throw new ErrorApp(`The reservation with the id ${reservationId} does not exist`, 404);        

    }

    return reservation
}

/**
 * GAP DE CÓDIGO, SI SE REALIZAN DOS RESERVACIONES AL MISMO TIEMPO, AMBAS SE CREAN SIMULTÁNEAMENTE
 */