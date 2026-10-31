
import { ErrorApp } from "../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";
import Reservation from "../models/reservationModel.js";
import {IMAGES_SUPABASE_FOLDER_COTTAGE, IMAGES_LOCAL_FOLDER_COTTAGE } from "../utils/config.js";
import { eraseImageSupabaseService, uploadImageSupabaseService } from "./storageSupabaseService.js";
import { eraseImageLocalService, uploadImageLocalService } from "./storageLocalService.js";

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

export const createCottageService = async (data, file) => {
    
    const image = await uploadImageSupabaseService(file, IMAGES_SUPABASE_FOLDER_COTTAGE) // A SUPABASE
    
    // const localImage = await uploadImageLocalService(file, IMAGES_LOCAL_FOLDER_COTTAGE) 
    // A local --> Es para tener una copia actualizada de lo que se sube a SUPABASE, esto no se retorna, la copia que se usa es la de SUPABASE.

    // Se lo comenta porque no es necesario, existe y para que funcione sólo debe descomentarse

    try {

        const cottage = await Cottage.create({...data, image})

        return cottage

    } catch (error) {
        
        await eraseImageSupabaseService(image, IMAGES_SUPABASE_FOLDER_COTTAGE) // Supabase

        // await eraseImageLocalService(localImage, IMAGES_LOCAL_FOLDER_COTTAGE ) // Local

        // Se lo comenta porque no es necesario, existe y para que funcione sólo debe descomentarse

        console.error(error);
        
        throw error
        
        }          

    }

// updateCottageService

    export const updateCottageService = async (cottageId, data, file) => {
    
        const previousCottage = await Cottage.findById({ _id: cottageId })

        const previousData = file ? previousCottage : null

        const changes = {...data}

        if (file) {
            
            changes.image = await uploadImageSupabaseService(file, IMAGES_SUPABASE_FOLDER_COTTAGE)

            // const localImage = await uploadImageLocalService(file, IMAGES_LOCAL_FOLDER_COTTAGE)

            // Se lo comenta porque no es necesario, existe y para que funcione sólo debe descomentarse

        }

        try {
            
            const cottage = await Cottage.findByIdAndUpdate({_id: cottageId}, changes, {
    
            returnDocument: "after",
    
            runValidators: true,
    
            }

        )

            if (cottage && previousData) {
                
                await eraseImageSupabaseService(previousData.image, IMAGES_SUPABASE_FOLDER_COTTAGE)

               // const localImage = await eraseImageLocalService(previousData.image, IMAGES_LOCAL_FOLDER_COTTAGE) // TODO: Revisión de la img. local para eliminarla

               // Se lo comenta porque no es necesario, existe y para que funcione sólo debe descomentarse
            }

            return cottage

        } catch (error) {
            
            console.error("There has been an error", error);
            
        }
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
