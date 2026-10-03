import * as cottageService from "../services/cottageService.js"

// getAllCottagesController

export const getAllCottagesController = async (req, res) => {
    
    const cottage = await cottageService.getAllCottagesService(req.query)

    res.status(200).json(cottage)
}

// getCottageByIdController

export const getCottageByIdController = async (req, res) => {
    
    const cottage = await cottageService.getCottageByIdService(req.params.id)

    if (!cottage) {
        
        res.status(404).json({error: "The Cottage required by the controller with GET does not exist"})
    }

    res.status(200).json(cottage)
}

// createCottageController

export const createCottageController = async (req, res) => {

    const cottage = await cottageService.createCottageService(req.body)

    res.status(201).json(cottage)
}

// updateCottageController

export const updateCottageController = async (req, res) => {

    const cottage = await cottageService.updateCottageService(req.params.id, req.body)

    if (!cottage) {
        
        res.status(404).json({error: "The Cottage required by the controller with UPDATE does not exist"})
    }

    res.status(200).json(cottage)
    
}

// deleteCottageController -- Verificar gaps

export const deleteCottageController = async (req, res) => {

    const cottage = await cottageService.deleteCottageService(req.params.id, req.body) 

    if (!cottage) {
        
        res.status(404).json({error: "The Cottage required by the controller with DELETE does not exist"})
    }

    res.status(200).json(cottage)
    
}