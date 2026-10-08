import Reservation from "../models/reservationModel";

//Validar la reservación y aplicar lógica de negocio

    const reservation = await Reservation.findOne


















    export const verifyReservationService = async (reservationId) => {
        
        const exist = await Reservation.exists({_id: reservationId})

        if (!exist) {
            
            throw new ErrorApp(`The reservation "${reservationId}" does not exist`, 404);
            
        }

    }

// getAllReservationsService

    export const getAllReservationsService = 3

// getReservationByIdService

// createReservationService

// updateReservationService

