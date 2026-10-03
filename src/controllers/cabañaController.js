import * as cabañaService from "../services/cabañaService.js"

// getAllCabañasController

export const getAllCabañasController = async (req, res) => {
    
    const cabañas = await cabañaService.getAllCabañasService(req.query)

    res.status(200).json(cabañas)
}

// getCabañaByIdController

export const getCabañaByIdController = async (req, res) => {
    
    const cabaña = await cabañaService.getCabañaByIdService(req.params.id)

    if (!cabaña) {
        
        res.status(404).json({error: "The cabaña required by the controller with GET does not exist"})
    }

    res.status(200).json(cabaña)
}

// createCabañaController

export const createCabañaController = async (req, res) => {

    const cabaña = await cabañaService.createCabañaService(req.body)

    res.status(201).json(cabaña)
}

// updateCabañaController

export const updateCabañaController = async (req, res) => {

    const cabaña = await cabañaService.updateCabañaService(req.params.id, req.body)

    if (!cabaña) {
        
        res.status(404).json({error: "The cabaña required by the controller with UPDATE does not exist"})
    }

    res.status(200).json(cabaña)
    
}

// deleteCabañaController -- Verificar gaps

export const deleteCabañaController = async (req, res) => {

    const cabaña = await cabañaService.deleteCabañaService(req.params.id, req.body) 

    if (!cabaña) {
        
        res.status(404).json({error: "The cabaña required by the controller with DELETE does not exist"})
    }

    res.status(200).json(cabaña)
    
}