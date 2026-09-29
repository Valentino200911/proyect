import mongoose from "mongoose";
import { ErrorApp } from "../../utils/ErrorApp.js";
import NaturalElement from "../models/naturalElementModel.js";

// CRUD general

// Validación del elemento

    export const verifyNaturalElement = async (naturalElementId) => {
        
        const exist = await NaturalElement.exists({_id: naturalElementId})

        if (!exist) {
            
            throw new ErrorApp(`The NaturalElement "${naturalElementId}" does not exist`, 404);
            
        }

    }

// getAllNaturalElements

    export const getAllNaturalElements = async ( {binomialName} = {} ) => {
        
        const filter = {}

        if (binomialName) {
            
            filter.binomialName = binomialName

        }
        return await NaturalElement.find(filter).sort( {name: 1} )
    }


// getNaturalElementsById

    export const getNaturalElementsById = async (naturalElementId) => {
        
        return await NaturalElement.findById({_id: naturalElementId})

    }

// createNaturalElements
    
    export const createNaturalElements = async (data) => {
        
        return await NaturalElement.create(data)

    }

// updateNaturalElements

    export const updateNaturalElements = async (naturalElementId, data) => {
        
        return await NaturalElement.findByIdAndUpdate({_id: naturalElementId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

    }

// deleteNaturalElements

        export const deleteNaturalElements = async (naturalElementId) => {
        
        return await NaturalElement.findByIdAndDelete({_id: naturalElementId})

    }