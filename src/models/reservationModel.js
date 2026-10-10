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
        max: [6, "You cannot have more than 6 companions"],
        validate: {
        validator: Number.isInteger,
        message: "The number of companions has to be an integer number"
        }
                
    },

    pricePerNightAndPerson: {
    type: Number,
    required: [true, "The price is required for the register"],
    min: [20000, "The price for one person during one night has to be over 20000"],
    max: [100000, "The price for one person during one night must not be over 100000"],
    validate: {
        validator: Number.isInteger,
        message: "The price has to be an integer number"
        },

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
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "The subtotal has to be an integer number"
        }
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
        validate: {
            validator: Number.isInteger,
            message: "The total price has to be an integer number"
        }
        
        // El max no es requerido, el min refiere al minimo teórico
    },
    reservationState: {

        type: String,
        enum: {values: RESERVATION_STATE, message: "The state of the reservation when it is creates is: 'in progress'"},
        default: "in progress"

    },
    methodOfPayment: {

        type: String,
        enum: {values: METHOD_OF_PAYMENT, message: "The methods of payment are: 'bankTransfer' or 'cash'"}
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
        required: [true, "It has to be written whether the reservation has been paid or not"]
    }

}, {timestamps: true})

export default mongoose.model("Reservation", reservationSchema)