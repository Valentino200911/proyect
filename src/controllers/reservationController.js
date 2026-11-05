
import * as reservationService from "../services/reservationService.js"

// getAllReservationsController

export const getAllReservationsController = async (req, res) => {

    // Nota, lo que sigue después del req NO ES UN NOMBRE, es la propiedad propiamente dicha con los elementos internos a los que se puede acceder mediante dot notation
    // Ej. req.user.id
        const reservations = await reservationService.getAllReservationsService(req.user.id, req.query)

        res.status(200).json(allUserReservations)

    }

// getReservationByIdController

export const getReservationByIdController = async (req, res) => {

        const reservation = await reservationService.getReservationByIdService(req.params.id, req.user.id)

        res.status(200).json(reservation)

    }


// createReservationController

export const createReservationController = async (req, res, next) => {
    
        const reservation = await reservationService.createReservationService(req.user.id, req.body.cottage, req.body)
        
        return res.status(201).json(reservation)

}

// updateReservationController

export const updateReservationController = async (req, res) => {
    
    const reservation = await reservationService.updateReservationService(req.params.id, req.user.id, req.body)

    res.status(200).json(reservation)

}

// deleteReservationController 

export const deleteReservationController = async (req, res) => {
    
    const reservation = await reservationService.deleteReservationService(req.params.id)

    res.status(200).json(reservation)

}