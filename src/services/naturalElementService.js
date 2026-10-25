import mongoose from "mongoose";
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

        const naturalElements = await NaturalElement.find(filter, {createdAt: 0, updatedAt: 0, __v: 0}).sort( {name: 1} ) // {} es un project a voluntad

        return naturalElements
    }


// getNaturalElementsByIdService

    export const getNaturalElementsByIdService = async (naturalElementId) => {
        
        const naturalElement = await NaturalElement.findById({_id: naturalElementId}, {createdAt: 0, updatedAt: 0, __v: 0}) // {} es un project a voluntad

        return naturalElement
    }

// createNaturalElementService
    
    export const createNaturalElementService = async (data) => {
        
        const naturalElement = await NaturalElement.create(data)

        return naturalElement

    }

// updateNaturalElementService

    export const updateNaturalElementService = async (naturalElementId, data) => {
        
        const naturalElement = await NaturalElement.findByIdAndUpdate({_id: naturalElementId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

        return naturalElement
    }

// deleteNaturalElementService

        export const deleteNaturalElementService = async (naturalElementId) => {
        
        const naturalElement = await NaturalElement.findByIdAndDelete({_id: naturalElementId})

        return naturalElement
    }