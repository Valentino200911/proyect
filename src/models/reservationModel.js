import mongoose from "mongoose";
import { METHOD_OF_PAYMENT, RESERVATION_STATE } from "../utils/exporter.js";

const reservationSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The user is required for the register"],
    },
    cottage: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Cottage",
        required: [true, "The cottage is required for the register"],
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
    passengerNumber: {

        // En el front el select p. el N° de acompañantes debe ir del 0 al 6 y aclarar que el que reserva ya está incluido según el sistema

        type: Number,
        required: [true, "The number of companions (excluding you) is required for the register"],
        min: [0, "You cannot have negative companions"],
        max: [7, "7 is the maximum level of people (including you) accepted"],
        validate: {
            validator: Number.isInteger,
            message: "The number of companions has to be an integer number"
        }

    },

    totalPrice: {

        type: Number,
        min: [20000, "The price for one person during one night has to be over 20000"],
        validate: {
            validator: Number.isInteger,
            message: "The total price has to be an integer number"
        }

        // El max no es requerido, el min refiere al minimo teórico
    },
    reservationState: {

        type: String,
        enum: { values: Object.values(RESERVATION_STATE), message: "The state of the reservation when it is creates is: 'in progress'" },
        default: RESERVATION_STATE.IN_PROGRESS

    },
    methodOfPayment: {

        type: String,
        enum: { values: Object.values(METHOD_OF_PAYMENT), message: "The methods of payment are: 'bankTransfer' or 'cash'" },
        required: [true, "You have to indicate the method of payment"],
        // No tiene default porque es a elección
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
        default: false
    }

}, { timestamps: true })

export default mongoose.model("Reservation", reservationSchema)