import { ErrorApp } from "../../utils/ErrorApp.js"
import * as reservationService from "../services/reservationService.js"

// getAllReservationsController

export const getAllReservationsController = async (req, res) => {
    
    const reservations = await reservationService.getAllReservationsService(req.query)

    res.status(200).json(reservations)

}

// getAllMyReservationsController

export const getAllMyReservationsController = async (req, res) => {
    
    const reservations = await reservationService.getAllMyReservations(req.user.id)

    res.status(200).json(reservations)

}

// getReservationByIdController

export const getReservationByIdController = async (req, res) => {
    
    const reservation = await reservationService.getReservationByIdService(req.params.id)

    res.status(200).json(reservations)

}

// getMyReservationByIdController

export const getMyReservationByIdController = async (req, res) => {
    
    const reservation = await reservationService.getMyReservationByIdService(req.params.id, req.user.id)

    res.status(200).json(reservations)

}

// createReservationController

export const createReservationController = async (req, res) => {
    
    const reservation = await reservationService.createReservationService(req.body) // Revisar si requiere req.params.id

    res.status(201).json(reservations)

}

// updateReservationController

export const updateReservationController = async (req, res) => {
    
    const reservation = await reservationService.updateReservationService(req.body, req.params.id)

}

// deleteReservationController (gap)