import { ErrorApp } from "../../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";
import User from "../models/userModel.js";
import Reservation from "../models/reservationModel.js";
import { verifyUserService } from "./userService.js";
import { POPULATE_RESERVATION } from "../../utils/constants/generalConstants.js";
import { verifyCottageService } from "./cottageService.js";

// Validar la reservación y aplicar lógica de negocio

    // Validaciones necesarias

    const validateCapacity = async (reservation) => {

        const capacity = await reservation.cottage.capacity

        const passangerNumber = await reservation.passangerNumber

        if (passangerNumber > capacity) {

            throw new ErrorApp(`The number of passager (${passangerNumber}) cannot be over the cottage's capacity (${capacity})`, 409);
            
        }
    }

    const validateDate = async (reservation) => {
    
        const entryDate = await reservation.entryDate

        const exitDate = await reservation.exitDate

        if (entryDate >= exitDate) {

            throw new ErrorApp(`The date of entry (${entryDate}) cannot be over or be same as the date of exit (${exitDate})`, 409);
            
        }
    }

    const validateDateSuperposition = async (reservation) => {

        const entryDate = await reservation.entryDate

        const exitDate = await reservation.exitDate

        // const existentReservations = await reservation

    }

    // Traer la reservación 

    const verifyIfReservationExistsService = async (reservationId) => {
        
        const reservation = await Reservation.findOne({_id: reservationId})

        if (!reservation) {
            
            throw new ErrorApp(`The reservation "${reservationId}" does not exist`, 404);
            
        }
        
        return reservation
        
    }
    
    const reservationData = async (reservation) => (
        
        await {       
            cottage: verifyCottageService(reservation.cottage._id),
            user: verifyUserService(reservation.user._id),
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
    
    // getAllReservationsService (Todos)
    
    export const getAllReservationsService = async () => {
        
        return await Reservation.find({}, {__v: 0}).populate(POPULATE_RESERVATION).sort({ createdAt: -1 })

    }

    // getAllMyReservations (Todos los que sean míos)

    export const getAllMyReservations = async (userId) => {
        
        return await Reservation.find({userId: userId}, {__v: 0}).populate(POPULATE_RESERVATION).sort({ createdAt: -1 })

    }

    // getReservationByIdService (Uno en específico)

    export const getReservationByIdService = async (reservationId) => {
        
        return await Reservation.findById({_id: reservationId}, {__v: 0}).populate(POPULATE_RESERVATION)

    }

    // getMyReservationByIdService (Uno en específico que sea mío)

    export const getMyReservationByIdService = async (userId, reservationId) => {
        
        return await Reservation.findOne({userId: userId, _id: reservationId}, {__v: 0}).populate(POPULATE_RESERVATION)

    }

    // createReservationService

    export const createReservationService = async (userId, cottageId, data) => {
        
        const user = await verifyCottageService(userId)

        const cottage = await verifyCottageService(cottageId)

        if (!cottage || !user) {

            throw new ErrorApp("There is a cottage or an user that does not exist", 404);
            
        }


        return await Reservation.create(data).populate(POPULATE_RESERVATION)

    }

    // updateReservationService

    export const updateReservationService = async (userId, {reservationState, isPaid, reservationComment} = {}) => {
    
        return await Reservation.findByIdAndUpdate({_id: userId},  {reservationState, isPaid, reservationComment}, {

        returnDocument: "after",

        runValidators: true,

        }
    ).populate(POPULATE_RESERVATION)

    }

    // Definir si se agrega el delete
