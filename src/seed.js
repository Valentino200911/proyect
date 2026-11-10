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
        image: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/naturalElementsImagesBucket/179553342145-qsf0s44.jpg", 
        info: "https://es.wikipedia.org/wiki/Vachellia_aroma"
    },
    {
        name: "Aramides", 
        binomialName: "Aramides cajaneus", 
        description: "ave que habita los territorios de Brasil, Argentina y Uruguay.", 
        image: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/naturalElementsImagesBucket/181532664214-aqg44y6.jpg", 
        info: "https://es.wikipedia.org/wiki/Aramides_cajaneus"
    },
    {
        name: "Churqui", 
        binomialName: "Vachellia caven", 
        description: "ave que habita los territorios de Brasil, Argentina y Uruguay.", 
        image: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/naturalElementsImagesBucket/18197554544-fdt54s6.jpg", 
        info: "https://es.wikipedia.org/wiki/Vachellia_caven"
    },
])

const [Juan, Pedro, Jose] = await User.create([

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
        birthDate: "1980-02-14",
        phoneNumber: "+5491234567896",
        email: "pedro.gomez@gmail.com",
        password: "Admin123",
        role: "admin"
    },
    {
        name: "Jose", 
        surname: "Juarez",
        birthDate: "1985-02-14",
        phoneNumber: "+5496234567896",
        email: "jose.juarez@gmail.com",
        password: "Jose1234",
        role: "user"
    },
    
])

const [Cabaña_1, Cabaña_2] = await Cottage.create([

    {
        name: "cabaña 1", 
        capacity: 7,
        pricePerNightAndPerson: 40000,
        location: "tafi viejo, tucuman",
        description: "Un lugar para descansar en contacto con la naturaleza",
        image: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/cottageImagesBucket/1793423330630-kpyhd1.jpg"
    
    },
    {
        name: "cabaña 2", 
        capacity: 2,
        pricePerNightAndPerson: 20000,
        location: "tafi viejo, tucuman",
        description: "Un lugar para descansar en contacto con la naturaleza",
        image: "https://wbiruthlzrzibmgrzboh.supabase.co/storage/v1/object/public/cottageImagesBucket/1794283381215-pwdnvh.jpg"
    
    },
    
])

const createdContact = await Contact.create([

    {

        user: Juan._id,
        reasonOfContact: "prom",
        contactComment: "Hi, 123"
    
    },
    {

        user: Juan._id,
        reasonOfContact: "problem",
        contactComment: "Hi, 124"
    
    },
    {

        user: Jose._id,
        reasonOfContact: "business",
        contactComment: "Hi, 125"
    
    },
    {

        user: Jose._id,
        reasonOfContact: "business",
        contactComment: "Hi, 126"
    
    },
    
])

const createdReservation = await Reservation.create([

    {
        user: Juan._id,
        cottage: Cabaña_1._id,
        entryDate: "2026-10-12",
        exitDate: "2026-10-14",
        passengerNumber: 3,
        methodOfPayment: "bankTransfer",
        isPaid: false,
        totalPrice: 240000,
        reservationComment: "Hi, 122R"
    },
    {
        user: Juan._id,
        cottage: Cabaña_2._id,
        entryDate: "2027-10-12",
        exitDate: "2027-10-14",
        passengerNumber: 2,
        methodOfPayment: "bankTransfer",
        isPaid: false,
        totalPrice: 80000,
        reservationComment: "Hi, 123R"

    },
    {
        user: Jose._id,
        cottage: Cabaña_2._id,
        entryDate: "2026-10-12",
        exitDate: "2026-10-14",
        passengerNumber: 2,
        methodOfPayment: "bankTransfer",
        isPaid: false,
        totalPrice: 80000,
        reservationComment: "Hi, 124R"

    },

])

console.log(`There are ${await NaturalElement.countDocuments()} documents from "naturalElement" registered`);

console.log(`There are ${await User.countDocuments()} documents from "user" registered`);

console.log(`There are ${await Cottage.countDocuments()} documents from "cottage" registered`);

console.log(`There are ${await Contact.countDocuments()} documents from "contact" registered`);

console.log(`There are ${await Reservation.countDocuments()} documents from "reservation" registered`);

await mongoose.connection.close()



