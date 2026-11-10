
// Estos son los primeros tests del proyecto. Debido a cuestiones de cronograma (10 de noviembre de 2026), no se expanden con mayor profundidad. Sin embargo, serán la base de las funcionalidades a futuro respecto a Testing del proyecto

import { ErrorApp } from "../src/utils/ErrorApp.js"
import { uniqueName } from "../src/utils/functions/uniqueName.js"

describe("uniqueName", () => {

    it("It mantains the original extension of the archive", () => {

        const name = uniqueName("mi-image.png")

        expect(name).toMatch(/\.png$/)
    })

    it("It never returns the same name twice", () => {

        // el set es parecido a un array, pero no guarda repetidos

        const names = new Set()

        for(let i = 0; i < 500; i++){

            names.add(uniqueName("tapa.jpg"))

        }
        expect(names.size).toBe(500)
    })
})

describe("ErrorApp", () => {

    it("It saves the message and the status that were sent", () => {

        const error = new ErrorApp("You cannot modify the reservation anymore", 409)

        expect(error.message).toBe("You cannot modify the reservation anymore")

        expect(error.status).toBe(409)

        expect(error.name).toBe("ErrorApp")

    })

    it("It is still an Error", () => {

        // toBeInstanceOf revisa si un objeto pertenece a una clase
        expect(new ErrorApp("anything", 400)).toBeInstanceOf(Error)
    })
})
