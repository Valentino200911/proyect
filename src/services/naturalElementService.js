
import { IMAGES_FOLDER_NATURAL_ELEMENT } from "../../utils/config.js";
import { ErrorApp } from "../../utils/ErrorApp.js";
import NaturalElement from "../models/naturalElementModel.js";
import { eraseImageService, uploadImageService } from "./storageService.js";

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
        
        const image = await uploadImageService(file, IMAGES_FOLDER_NATURAL_ELEMENT)

        try {

            const naturalElement = await NaturalElement.create({...data, file})

            return naturalElement

        } catch (error) {
            
            await eraseImageService(image, IMAGES_FOLDER_NATURAL_ELEMENT)

        }


    }

// updateNaturalElementService

    export const updateNaturalElementService = async (naturalElementId, data, file) => {
        
        const previousNaturalElement = await NaturalElement.findById({ _id: naturalElementId })

        const previousData = file ? previousNaturalElement : null

        const changes = {...data}

        if (file) {
            
            changes.image = await uploadImageService(file, IMAGES_FOLDER_NATURAL_ELEMENT)

        }

        try {
            
            const naturalElement = await NaturalElement.findByIdAndUpdate({_id: naturalElementId}, changes, {
    
            returnDocument: "after",
    
            runValidators: true,
    
            }
        )

            if (naturalElement && previousData) {
                
                await eraseImageService(previousData.image, IMAGES_FOLDER_NATURAL_ELEMENT)

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