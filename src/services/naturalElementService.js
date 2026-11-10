
import NaturalElement from "../models/naturalElementModel.js";
import { IMAGES_FOLDER_NATURAL_ELEMENT } from "../utils/config.js";
import { ErrorApp } from "../utils/ErrorApp.js";
import { eraseImageService, uploadImageService } from "./storageService.js";

// CRUD general

// Validación del elemento

    export const verifyNaturalElementService = async (naturalElementId) => {
        
        const exist = await NaturalElement.exists({_id: naturalElementId})

        if (!exist) {
            
            throw new ErrorApp(`The natural element with the _id "${naturalElementId}" does not exist`, 404);
            
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

        if (!naturalElement) {
            
            throw new ErrorApp(`The natural element with the _id ${naturalElementId} does not exist`);
            

        }

        return naturalElement
    }

// createNaturalElementService
    
    export const createNaturalElementService = async (data, file) => {
        
        const image = await uploadImageService(file, IMAGES_FOLDER_NATURAL_ELEMENT) // A SUPABASE
        
        try {

            const naturalElement = await NaturalElement.create({...data, image})

            return naturalElement

        } catch (error) {
            
            await eraseImageService(image, IMAGES_FOLDER_NATURAL_ELEMENT) // Supabase

            console.error(error);
            
            throw error
            
        }          
        
    }

// updateNaturalElementService

    export const updateNaturalElementService = async (naturalElementId, data, file) => {
        
        const previousNaturalElement = await NaturalElement.findById({ _id: naturalElementId })

        if (!previousNaturalElement) {
            
            throw new ErrorApp(`The natural element with the _id ${naturalElementId} does not exist`);
            

        }

        const changes = {...data}

        let newImageUrl = null

        if (file) {
            
            newImageUrl = await uploadImageService(file, IMAGES_FOLDER_NATURAL_ELEMENT)

            changes.image = newImageUrl
        }

        try {
            
            const naturalElement = await NaturalElement.findByIdAndUpdate({_id: naturalElementId}, changes, {
    
            returnDocument: "after",
    
            runValidators: true,
    
            }

        )

            if (naturalElement && previousNaturalElement.image && newImageUrl) {
                
                await eraseImageService(previousNaturalElement.image, IMAGES_FOLDER_NATURAL_ELEMENT)

            }

            return naturalElement

        } catch (error) {

            if (newImageUrl) {

                await eraseImageService(newImageUrl, IMAGES_FOLDER_NATURAL_ELEMENT)
                    
            }
            
            console.error("There has been an error", error);
            
            throw error
        }

    }

// deleteNaturalElementService

        export const deleteNaturalElementService = async (naturalElementId) => {
        
        const naturalElement = await NaturalElement.findByIdAndDelete({_id: naturalElementId})

        if (!naturalElement) {
            
            throw new ErrorApp(`The natural element with the _id ${naturalElementId} does not exist`);
            

        }        

        if (naturalElement) {
            
            await eraseImageService(naturalElement.image, IMAGES_FOLDER_NATURAL_ELEMENT)

        }

        return naturalElement
    }