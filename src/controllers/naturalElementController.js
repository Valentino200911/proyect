import * as naturalElementService from "../services/naturalElementService.js"

// getAllNaturalElementsController

    export const getAllNaturalElementsController = async (req, res) => {
        
        const naturalElements = await naturalElementService.getAllNaturalElementsService(req.query)

        res.status(200).json(naturalElements)

    }

// getNaturalElementByIdController

    export const getNaturalElementByIdController = async (req, res) => {
        
        const naturalElement = await naturalElementService.getNaturalElementsByIdService(req.params.id)

        res.status(200).json(naturalElement)
    
    }

// createNaturalElementController

    export const createNaturalElementController = async (req, res) => {
        
        const naturalElement = await naturalElementService.createNaturalElementService(req.body, req.file)

        res.status(201).json(naturalElement)
    }

// updateNaturalElementController

    export const updateNaturalElementController = async (req, res) => {
        
        const naturalElement = await naturalElementService.updateNaturalElementService(req.params.id, req.body, req.file)

        res.status(200).json(naturalElement)
    }

// deleteNaturalElementController

    export const deleteNaturalElementController = async (req, res) => {
        
        const naturalElement = await naturalElementService.deleteNaturalElementService(req.params.id)

        res.status(200).json(naturalElement)

    }