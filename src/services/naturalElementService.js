import mongoose from "mongoose";
import { handleError } from "../../middlewares/handleError.js";
import { ErrorApp } from "../../utils/ErrorApp.js";
import NaturalElement from "../models/naturalElementModel.js";

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
        return await NaturalElement.find(filter, {createdAt: 0, updatedAt: 0, __v: 0}).sort( {name: 1} ) // {} es un project a voluntad
    }


// getNaturalElementsByIdService

    export const getNaturalElementsByIdService = async (naturalElementId) => {
        
        return await NaturalElement.findById({_id: naturalElementId}, {createdAt: 0, updatedAt: 0, __v: 0}) // {} es un project a voluntad

    }

// createNaturalElementService
    
    export const createNaturalElementService = async (data) => {
        
        return await NaturalElement.create(data)

    }

// updateNaturalElementService

    export const updateNaturalElementService = async (naturalElementId, data) => {
        
        return await NaturalElement.findByIdAndUpdate({_id: naturalElementId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

    }

// deleteNaturalElementService

        export const deleteNaturalElementService = async (naturalElementId) => {
        
        return await NaturalElement.findByIdAndDelete({_id: naturalElementId})

    }