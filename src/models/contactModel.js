import mongoose from "mongoose";
import User from "./userModel.js";
import { REASON_OF_CONTACT } from "../../utils/constants/generalConstants.js";

export const contactSchema = new mongoose.Schema({

user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "The user is required"],
},

reasonOfContact: {
    type: String,
    required: [true, "The reason of contact is required"],
    enum: {values: REASON_OF_CONTACT, message: "The reason of contact has to be: 'buisness', 'prom', 'problem' or 'suggestion' "}
},

contactComment: {
    type: String,
    required: [true, "The comment is required"],
    minLength: [3, "At least 3 characters are required to send a message"],
    maxLength: [1024, "At most 1024 characters are required to send a message"],
    trim: true,
    // No se incluye el lowercase: true para que por motivos legales el mensaje quede tal cual haya sido enviado
}

}, {timestamps: true} //Protocolo de seguridad
)

export default mongoose.model("Contact", contactSchema)