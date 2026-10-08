import mongoose from "mongoose";
import User from "./userModel.js";
import Cottage from "./cottageModel.js";
import { METHOD_OF_PAYMENT, RESERVATION_STATE } from "../../utils/constants/generalConstants.js";

const detailSchema = new mongoose.Schema({

    cottageId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Cottage",
        required: [true, "The Cottage is required"],

    },

    passangerNumber: {

        type: Number,
        required: [true, "The number of companions (excluding you) is required for the register"],
        min: [0, "You cannot have negative companions"],
        max: [6, "You cannot have more than 6 companions"]        
    },

    pricePerNightAndPerson: {
    type: Number,
    required: [true, "The price is required for the register"],
    min: [20000, "The price for one person during one night has to be over 20000"],
    max: [100000, "The price for one person during one night must not be over 100000"],

    entryDate: {
        type: Date,
        required: [true, "The arriving date is required for the register"],
        trim: true,
    },
    exitDate: {
        type: Date,
        required: [true, "The leaving date is required for the register"],
        trim: true,
    },

    subtotal: {

        type: Number,
        required: true,
        min: 0
    }
    },    

}, {_id: false})


const reservationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The user is required"],
    },
    detail: {

        type: detailSchema
    },
    totalPrice: {

        type: Number,
        required: [true, "The price is required for the register"],
        min: [20000, "The price for one person during one night has to be over 20000"],
        // El max no es requerido, el min refiere al minimo teórico
    },
    reservationState: {

        type: String,
        enum: RESERVATION_STATE,
        default: "in progress"

    },
    methodOfPayment: {

        type: String,
        enum: METHOD_OF_PAYMENT
    },

    reservationComment: 
    {
    type: String,    
    minLength: [3, "At least 3 characters are required to send a message"],
    maxLength: [1024, "At most 1024 characters are required to send a message"],
    trim: true,
    // No se incluye el lowercase: true para que por motivos legales el mensaje quede tal cual haya sido enviado
},
    isPaid: {

        type: Boolean,
        required: true
    }

}, {timestamps: true})

export default mongoose.model("Reservation", reservationSchema)