import multer from "multer"

const fileMaxSize = 4 //Megabytes

const storage = multer.memoryStorage()

// validación de imagenes

const imagesOnly =  (req, file, cb) => {
    
    if (file.mimetype.startsWith("image/")) {
        
        cb(null, true)

    } else {

        cb(new Error("Only images are allowed"), false)

    }

}

const upload = multer({
    
    storage,

    fileFilter: imagesOnly,

    limits: {

        fileSize: fileMaxSize * 1024 * 1024

    }

})

// Upload
// Hay que saber el name exacto del campo

export const uploadImages = upload.single("image")

// manejo de errores:
// limite de peso de la imagen
// campo incorrecto de la imagen
// un error comun de procesamiento
// solo imagenes permitidas
// que no se haya usado multipart

export const handleMulterErrors = (error, req, res, next) => {
    if(error?.name === "MulterError") {
        if(error.code === "LIMIT_FILE_SIZE"){
            return res.status(400).json({ error: "The size of the file cannot be over 4 MB" })
        }
        if(error.code === "LIMIT_UNEXPECTED_FILE"){
            return res.status(400).json({ error: `The uploading of an image was not expected in "${error.field}". The value has to be "image"`})
        }
        return res.status(400).json({error: "The archive could not be processed"})
    }

    // error de nuestro filtro de archivos
    if(error?.message === "Only Images are allowed"){
        return res.status(400).json({ error: error.message })
    }

    // no escribimos el content-type a mano en postman
    if(error?.message?.includes("Boundary not found")){
        return res.status(400).json({
            error: "Error with header Content-Type written manually"
        })
    }
    next(error) // cualquier otro error sigue al middleware general
}