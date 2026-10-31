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
import { API_URL, STORAGE_LOCAL } from "../../utils/config.js"
import { uniqueName } from "../../utils/constants/uniqueName.js"


export const uploadLocal = async (file, FOLDER) => {

    const name = uniqueName(file.originalname)

    const folder = path.resolve(`${STORAGE_LOCAL}/${FOLDER}`) // La carpeta que se crea en este caso es local/FOLDER, dentro de la carpeta de este proyecto

    // recursive: true → si la carpeta ya existe, no se crea

    await fs.mkdir(folder, { recursive: true })

    await fs.writeFile(path.join(folder, name), file.buffer)

    // esta URL funciona gracias al express.static() de index.js

    const archive = `${API_URL}/${STORAGE_LOCAL}/${FOLDER}/${name}`
    
    return archive
}

export const eraseLocal = async (url, FOLDER) => {

    const name = path.basename(new URL(url).pathname)

    // force: true → si el archivo ya no está, no tira error
    await fs.rm(path.join(path.resolve(`${STORAGE_LOCAL}/${FOLDER}`), name), { force: true })
}