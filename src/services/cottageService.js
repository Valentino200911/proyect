
import { ErrorApp } from "../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";
import Reservation from "../models/reservationModel.js";

// CRUD General

// Validación del elemento

    export const verifyCottageService = async (cottageId) => {
        
        const exist = await Cottage.exists({_id: cottageId})

        if (!exist) {
            
            throw new ErrorApp(`The Cottage "${cottageId}" does not exist`, 404);
            
        }

    }

// getAllCottagesService

    export const getAllCottagesService = async () => {
        
        const cottages = await Cottage.find({}, {createdAt: 0, updatedAt: 0, __v: 0}).sort({ name: 1 }) // No hay filter, se define el project

        return cottages
    }

// getCottageByIdService

    export const getCottageByIdService = async (cottageId) => {
        
        const cottage = await Cottage.findById({_id: cottageId}, {createdAt: 0, updatedAt: 0, __v: 0}) // El segundo {} es un project

        return cottage
    }

// createCottageService

    export const createCottageService = async (data) => {
        
        const cottage = await Cottage.create(data)

        return cottage

    }

// updateCottageService

    export const updateCottageService = async (cottageId, data) => {
    
        const cottage = await Cottage.findByIdAndUpdate({_id: cottageId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

        return cottage

    }

// deleteCottageService -- No es ideal tener un delete para este caso, pero por cuestiones de coherencia de CRUD, se lo deja || En todo caso, validar la eliminación

    export const deleteCottageService = async (cottageId) => {
        
            const validationCottage = await verifyCottageService

            if (!validationCottage) {
        
                return null

            } 
        
            const reservations = await Reservation.countDocuments({cottage: {_id: cottageId}})
        
            if (reservations > 0) {
                
                throw new ErrorApp(`The cottage cannot be deleted becuase it has registered ${reservations} reservations `, 409)
        
            }

        const cottage = await Cottage.findByIdAndDelete({_id: cottageId})
        
        return cottage
        
    }
