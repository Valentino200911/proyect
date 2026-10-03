import mongoose from "mongoose";
import { ErrorApp } from "../../utils/ErrorApp.js";
import Cabaña from "../models/cabañaModel.js";

// CRUD General

// Validación del elemento

// Validación del elemento

    export const verifyCabañaService = async (cabañaId) => {
        
        const exist = await NaturalElement.exists({_id: cabañaId})

        if (!exist) {
            
            throw new ErrorApp(`The NaturalElement "${cabañaId}" does not exist`, 404);
            
        }

    }

// getAllCabañasService

    export const getAllCabañasService = async () => {
        
        return await Cabaña.find({}, {}).sort({ name: 1 }) // No hay filter, se define el project

    }

// getCabañaByIdService

    export const getCabañaByIdService = async (cabañaId) => {
        
        return await Cabaña.findById({_id: cabañaId}, {}) // El segundo {} es un project

    }

// createCabañaService

    export const createCabañaService = async (data) => {
        
        return await Cabaña.create(data)
    }

// updateCabañaService

    export const updateCabañaService = async (cabañaId, data) => {
    
        return await User.findByIdAndUpdate({_id: cabañaId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

    }

// deleteCabañaService -- No es ideal tener un delete para este caso, pero por cuestiones de coherencia de CRUD, se lo deja || En todo caso, validar la eliminación

    export const deleteCabañaService = async (cabañaId) => {
        
        return await Cabaña.findByIdAndDelete({_id: cabañaId})
        
    }
