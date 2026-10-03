import mongoose from "mongoose";
import { ErrorApp } from "../../utils/ErrorApp.js";
import Cottage from "../models/cottageModel.js";

// CRUD General

// Validación del elemento

// Validación del elemento

    export const verifyCottageService = async (cottageId) => {
        
        const exist = await Cottage.exists({_id: cottageId})

        if (!exist) {
            
            throw new ErrorApp(`The Cottage "${cottageId}" does not exist`, 404);
            
        }

    }

// getAllCottagesService

    export const getAllCottagesService = async () => {
        
        return await Cottage.find({}, {}).sort({ name: 1 }) // No hay filter, se define el project

    }

// getCottageByIdService

    export const getCottageByIdService = async (cottageId) => {
        
        return await Cottage.findById({_id: cottageId}, {}) // El segundo {} es un project

    }

// createCottageService

    export const createCottageService = async (data) => {
        
        return await Cottage.create(data)
    }

// updateCottageService

    export const updateCottageService = async (cottageId, data) => {
    
        return await Cottage.findByIdAndUpdate({_id: cottageId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

    }

// deleteCottageService -- No es ideal tener un delete para este caso, pero por cuestiones de coherencia de CRUD, se lo deja || En todo caso, validar la eliminación

    export const deleteCottageService = async (cottageId) => {
        
        return await Cottage.findByIdAndDelete({_id: cottageId})
        
    }
