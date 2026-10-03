import mongoose from "mongoose";
import { connectDB } from "./db.js";
import NaturalElement from "./models/naturalElementModel.js";
import User from "./models/userModel.js";
import Cottage from "./models/cottageModel.js";

await connectDB()

await NaturalElement.deleteMany({})

await User.deleteMany({})

await Cottage.deleteMany({})

console.log("The collection has been emptied"); // Vacía las colecciones para evitar fusión o duplicado de info.

await NaturalElement.syncIndexes() // Aplicación de los índices

await User.syncIndexes()

await Cottage.syncIndexes()

const createdNaturalElements = await NaturalElement.create([

    {
        name: "Tusca", 
        binomialName: "Vachellia aroma", 
        description: "arbol perteneciente a la familia de las acacias que se ubica en el territorio argentino.", 
        image: "https://evojuego.wordpress.com/wp-content/uploads/2020/10/tusca.jpg", 
        info: "https://es.wikipedia.org/wiki/Vachellia_aroma"
    },
])

const createdUsers = await User.create([

    {
        name: "Juan", 
        surname: "Perez",
        birthDate: "1999-12-31",
        phoneNumber: "+5491234567890",
        email: "juan.perez@gmail.com",
        password: "Password123",
        role: "user"
    },
    
])

const createdCottages = await Cottage.create([

    {
        name: "cabaña 1", 
        capacity: 7,
        pricePerNightAndPerson: 40000,
        location: "tafi viejo, tucuman",
        description: "Un lugar para descansar en contacto con la naturaleza"
    
    },
    
])

console.log(`There are ${await NaturalElement.countDocuments()} documents from "naturalelement" registered`);

console.log(`There are ${await User.countDocuments()} documents from "user" registered`);

console.log(`There are ${await Cottage.countDocuments()} documents from "cottage" registered`);

await mongoose.connection.close()


