import { ErrorApp } from "../../utils/ErrorApp.js"
import * as reservationService from "../services/reservationService.js"

// getAllReservationsController

export const getAllReservationsController = async (req, res) => {

    // Nota, lo que sigue después del req NO ES UN NOMBRE, es la propiedad propiamente dicha con los elementos internos a los que se puede acceder mediante dot notation

    const role = req.user.role // Aquí va la obtención del admin

    if (role === "admin") {

        const allReservations = await reservationService.getAllReservationsService()

        res.status(200).json(allReservations)

    } else {

        const allUserReservations = await reservationService.getAllReservationsService(req.user.id)

        res.status(200).json(allUserReservations)

    }

}

// getReservationByIdController

export const getReservationByIdController = async (req, res) => {
    
        const role = req.user.role // Aquí va la obtención del admin

    if (role === "admin") {

        const specificReservation = await reservationService.getReservationByIdService(req.params.id)

        res.status(200).json(specificReservation)

    } else {

        const mySpecificReservation = await reservationService.getReservationByIdService(req.params.id, req.user.id)

        res.status(200).json(mySpecificReservation)

    }

}

// createReservationController

export const createReservationController = async (req, res, next) => {
    
    try {

        const reservation = await reservationService.createReservationService(req.user.id, req.body.cottage, req.body)
        
        return res.status(201).json(reservation)

    } catch (error) {
    
        next(error)

    }

}

// updateReservationController

export const updateReservationController = async (req, res) => {
    
    const reservation = await reservationService.updateReservationService(req.params.id, req.body)

    if (!reservation) {
    
        return res.status(404).json({error: "The reservation required by the controller with UPDATE does not exist"})

    }

    res.status(200).json(reservation)

}

// deleteReservationController 

export const deleteReservationController = async (req, res) => {
    
    const reservation = await reservationService.deleteReservationService(req.params.id)

    if (!reservation) {
    
        return res.status(404).json({error: "The reservation required by the controller with DELETE does not exist"})

    }

    res.status(200).json(reservation)

}