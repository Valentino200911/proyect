import { ErrorApp } from "../../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";
import Reservation from "../models/reservationModel.js";
import { verifyUserService } from "./userService.js";

// Validar la reservación y aplicar lógica de negocio

    // Traer la reservación 

    
    const verifyIfReservationExistsService = async (reservationId) => {
        
        const reservation = await Reservation.findOne({_id: reservationId})

        if (!reservation) {
            
            throw new ErrorApp(`The reservation "${reservationId}" does not exist`, 404);
            
        }
        
        return reservation
        
    }
    
    const verifyReservationCapacity = (reservation) => {
        
        if (reservation.passangerNumber > reservation.detail.capacity) {
            
            throw new ErrorApp(`The number of passangers (${reservation.passangerNumber}), cannot be over the capacity of the cottage (${reservation.detail.capacity})`, 409);

        }

    }
    
    const reservationData =  (reservation) => (
        
        {       
            cottage: reservation.detail.cottageId,
            user: verifyUserService(reservation.userId),
            entryDate: reservation.entryDate,
            exitDate: reservation.exitDate,
            passangerNumber: reservation.passangerNumber,
            totalPrice: (reservation.detail.pricePerNightAndPerson * reservation.passangerNumber * Math.round((reservation.exitDate - reservation.entryDate)/86400000)),
            reservationState: reservation.reservationState,
            methodOfPayment: reservation.methodOfPayment,
            isPaid: reservation.isPaid,
            reservationComment: reservation.reservationComment
            
        }

    )
    
    export const verifyReservationService = async (reservationId) => {
        
        const reservation = await verifyIfReservationExistsService(reservationId)
    
        verifyReservationCapacity(reservation)

        const verifiedReservation = reservationData(reservation)
    
        return verifiedReservation
    }
    
    // getAllReservationsService
    
    export const getAllReservationsService = async () => {
        
        return await Reservation.find({}, {}).sort({ createdAt: -1 })

    }

    // getAllMyReservations

    export const getAllMyReservations = async (userId) => {
        
        return await Reservation.find({userId: userId}, {__v: 0}).sort({ createdAt: -1 })

    }

    // getReservationByIdService

    export const getReservationByIdService = async (reservationId) => {
        
        return await Reservation.find({_id: reservationId}, {__v: 0})

    }

    // createReservationService

    export const createReservationService = async (data) => {
        
        return await Reservation.create(data)

    }

    // updateReservationService

    export const updateReservationService = async (userId, data) => {
    
        return await Reservation.findByIdAndUpdate({_id: userId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

    }

    // Definir si se agrega el delete
