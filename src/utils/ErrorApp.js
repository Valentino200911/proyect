export class ErrorApp extends Error {

    constructor(message, status = 400 ){

        super(message) // Por qué el message requiere super?

        this.name = "ErrorApp"

        this.status = status

    }
    
}