
import NaturalElement from "../models/naturalElementModel.js";
import { IMAGES_SUPABASE_FOLDER_NATURAL_ELEMENT, IMAGES_LOCAL_FOLDER_NATURAL_ELEMENT } from "../utils/config.js";
import { eraseImageLocalService, uploadImageLocalService } from "./storageLocalService.js";
import { eraseImageSupabaseService, uploadImageSupabaseService } from "./storageSupabaseService.js";

// CRUD general

// Validación del elemento

    export const verifyNaturalElementService = async (naturalElementId) => {
        
        const exist = await NaturalElement.exists({_id: naturalElementId})

        if (!exist) {
            
            throw new ErrorApp(`The NaturalElement "${naturalElementId}" does not exist`, 404);
            
        }

    }

// getAllNaturalElementsService

    export const getAllNaturalElementsService = async ( {binomialName} = {} ) => {
        
        const filter = {}

        if (binomialName) {
            
            filter.binomialName = binomialName

        }

        const naturalElements = await NaturalElement.find(filter, {createdAt: 0, updatedAt: 0, __v: 0}).sort( {name: 1} ) // {} es un project a voluntad

        return naturalElements
    }


// getNaturalElementsByIdService

    export const getNaturalElementsByIdService = async (naturalElementId) => {
        
        const naturalElement = await NaturalElement.findById({_id: naturalElementId}, {createdAt: 0, updatedAt: 0, __v: 0}) // {} es un project a voluntad

        return naturalElement
    }

// createNaturalElementService
    
    export const createNaturalElementService = async (data, file) => {
        
        const image = await uploadImageSupabaseService(file, IMAGES_SUPABASE_FOLDER_NATURAL_ELEMENT) // A SUPABASE

        const localImage = await uploadImageLocalService(file, IMAGES_LOCAL_FOLDER_NATURAL_ELEMENT) // A local --> Es para tener una copia actualizada de lo que se sube a SUPABASE, esto no se retorna, la copia que se usa es la de SUPABASE.

        // Si desea excluir esta funcionalidad, comente la constante localImage para desactivarla
        
        try {

            const naturalElement = await NaturalElement.create({...data, image})

            return naturalElement

        } catch (error) {
            
            await eraseImageSupabaseService(image, IMAGES_SUPABASE_FOLDER_NATURAL_ELEMENT) // Supabase

            await eraseImageLocalService(localImage, IMAGES_LOCAL_FOLDER_NATURAL_ELEMENT ) // Local

            console.error(error);
            
            throw error
            
        }          
        
    }

// updateNaturalElementService

    export const updateNaturalElementService = async (naturalElementId, data, file) => {
        
        const previousNaturalElement = await NaturalElement.findById({ _id: naturalElementId })

        const previousData = file ? previousNaturalElement : null

        const changes = {...data}

        if (file) {
            
            changes.image = await uploadImageSupabaseService(file, IMAGES_SUPABASE_FOLDER_NATURAL_ELEMENT)

            const localImage = await uploadImageLocalService(file, IMAGES_LOCAL_FOLDER_NATURAL_ELEMENT)

        }

        try {
            
            const naturalElement = await NaturalElement.findByIdAndUpdate({_id: naturalElementId}, changes, {
    
            returnDocument: "after",
    
            runValidators: true,
    
            }

        )

            if (naturalElement && previousData) {
                
                await eraseImageSupabaseService(previousData.image, IMAGES_SUPABASE_FOLDER_NATURAL_ELEMENT)

                // const localImage = await eraseImageLocalService(previousData.image, IMAGES_LOCAL_FOLDER_NATURAL_ELEMENT) // TODO: Revisión de la img. local para eliminarla
            }

            return naturalElement

        } catch (error) {
            
            console.error("There has been an error", error);
            
        }

    }

// deleteNaturalElementService

        export const deleteNaturalElementService = async (naturalElementId) => {
        
        const naturalElement = await NaturalElement.findByIdAndDelete({_id: naturalElementId})

        return naturalElement
    }