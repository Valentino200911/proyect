import * as cottageService from "../services/cottageService.js"

// getAllCottagesController

export const getAllCottagesController = async (req, res) => {
    
    const cottage = await cottageService.getAllCottagesService(req.query)

    res.status(200).json(cottage)
}

// getCottageByIdController

export const getCottageByIdController = async (req, res) => {
    
    const cottage = await cottageService.getCottageByNameService(req.query)

    res.status(200).json(cottage)

}

// createCottageController

export const createCottageController = async (req, res) => {

    const cottage = await cottageService.createCottageService(req.body, req.file)

    res.status(201).json(cottage)
}

// updateCottageController

export const updateCottageController = async (req, res) => {

    const cottage = await cottageService.updateCottageService(req.params.id, req.body, req.file)

    res.status(200).json(cottage)
    
}

// deleteCottageController -- Verificar gaps

export const deleteCottageController = async (req, res) => {

    const cottage = await cottageService.deleteCottageService(req.params.id) 

    res.status(200).json(cottage)
    
}