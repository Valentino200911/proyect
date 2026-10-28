// clase 23 · ADAPTADOR DE DISCO LOCAL
//
// Sirve para trabajar sin cuenta de nadie... y para ENTENDER por qué no alcanza.
// Tres problemas que no tienen los storages de verdad:
//   1. Se borra en cada deploy: el servidor se reconstruye de cero.
//   2. Con dos servidores, la imagen está en uno solo: la mitad de las
//      peticiones no la encuentra.
//   3. Tu servidor gasta tiempo y ancho de banda sirviendo archivos en vez
//      de responder la API.
import fs from "fs/promises"
import path from "path"
import { uniqueName } from "./uniqueName.js"
import { IMAGES_FOLDER_COTTAGE, IMAGES_FOLDER_COTTAGE } from "../../../utils/config.js"

export const upload = async (file, FOLDER) => {
    const name = uniqueName(file.originalname)
    const folder = path.resolve(FOLDER)

    // recursive: true → si la carpeta ya existe, no se queja
    await fs.mkdir(carpeta, { recursive: true })
    await fs.writeFile(path.join(folder, name), file.buffer)

    // esta URL funciona gracias al express.static() de index.js

    return `${API_URL}/${FOLDER}/${name}`
}

export const erase = async (url, FOLDER) => {

    const name = path.basename(new URL(url).pathname)

    // force: true → si el archivo ya no está, no tira error
    await fs.rm(path.join(path.resolve(FOLDER), name), { force: true })
}