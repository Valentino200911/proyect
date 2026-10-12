import mongoose from "mongoose";
import { connectDB } from "./db.js";
import NaturalElement from "./models/naturalElementModel.js";
import User from "./models/userModel.js";
import Cottage from "./models/cottageModel.js";
import Contact from "./models/contactModel.js";
import Reservation from "./models/reservationModel.js";

await connectDB()

await NaturalElement.deleteMany({})

await User.deleteMany({})

await Cottage.deleteMany({})

await Contact.deleteMany({})

await Reservation.deleteMany({})

console.log("The collection has been emptied"); // Vacía las colecciones para evitar fusión o duplicado de info.

await NaturalElement.syncIndexes() // Aplicación de los índices

await User.syncIndexes()

await Cottage.syncIndexes()

await Contact.syncIndexes()

await Reservation.syncIndexes()

const createdNaturalElements = await NaturalElement.create([

    {
        name: "Tusca", 
        binomialName: "Vachellia aroma", 
        description: "arbol perteneciente a la familia de las acacias que se ubica en el territorio argentino.", 
        image: "https://evojuego.wordpress.com/wp-content/uploads/2020/10/tusca.jpg", 
        info: "https://es.wikipedia.org/wiki/Vachellia_aroma"
    },
])

const [Juan, Pedro] = await User.create([

    {
        name: "Juan", 
        surname: "Perez",
        birthDate: "1999-12-31",
        phoneNumber: "+5491234567890",
        email: "juan.perez@gmail.com",
        password: "Password123",
        role: "user"
    },
    {
        name: "Pedro", 
        surname: "Gomez",
        birthDate: "1950-02-14",
        phoneNumber: "+5491234567896",
        email: "pedro.gomez@gmail.com",
        password: "Admin123",
        role: "admin"
    },
    
])

const [Cabaña_1] = await Cottage.create([

    {
        name: "cabaña 1", 
        capacity: 7,
        pricePerNightAndPerson: 40000,
        location: "tafi viejo, tucuman",
        description: "Un lugar para descansar en contacto con la naturaleza"
    
    },
    {
        name: "cabaña 2", 
        capacity: 2,
        pricePerNightAndPerson: 20000,
        location: "tafi viejo, tucuman",
        description: "Un lugar para descansar en contacto con la naturaleza"
    
    },
    
])

const createdContact = await Contact.create([

    {

        user: Juan._id,
        reasonOfContact: "prom",
        contactComment: "Hi, 123"
    
    },
    
])

const createdReservation = await Reservation.create([

    {
        userId: Juan._id,
        entryDate: "2026-10-12",
        exitDate: "2026-10-14",
        passangerNumber: 3,
        totalPrice: 3 * 2 * Cabaña_1.pricePerNightAndPerson,
        reservationState: "in progress",
        methodOfPayment: "bankTransfer",
        isPaid: false,
        detail: {
            capacity: Cabaña_1.capacity,
            pricePerNightAndPerson: Cabaña_1.pricePerNightAndPerson,
            cottageId: Cabaña_1._id
        }

    }


])

console.log(`There are ${await NaturalElement.countDocuments()} documents from "naturalElement" registered`);

console.log(`There are ${await User.countDocuments()} documents from "user" registered`);

console.log(`There are ${await Cottage.countDocuments()} documents from "cottage" registered`);

console.log(`There are ${await Contact.countDocuments()} documents from "contact" registered`);

console.log(`There are ${await Reservation.countDocuments()} documents from "reservation" registered`);

await mongoose.connection.close()


