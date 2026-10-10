import mongoose from "mongoose";
import { LOCATION } from "../../utils/constants/generalConstants.js";

const cottageSchema = new mongoose.Schema({

name:{
    type: String,
    required: [true, "The name is required for the register"],
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
    minLength: [3, "At least 3 characters are required"],
    maxLength: [8, "At most 8 characters are required"]
},
capacity:{
    type: Number,
    required: [true, "The capacity is required for the register"],
    min: [2, "The capacity has to be over 2"],
    max: [7, "The capacity must not be over 7"],
    validate: {
        validator: Number.isInteger,
        message: "The capacity has to be an integer number"
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
        }
},
location:{
    type: String,
    required: [true, "The location is required for the register"],
    enum: {values: LOCATION, message: "The only location available is 'tafi viejo, tucuman'"},
    default: "tafi viejo, tucuman",
},
description:{
    type: String,
    required: [true, "The description of the cottage is required"],
    minLength: [3, "At least 3 characters are required to describe this cottage"],
    maxLength: [512, "At most 512 characters are required to describe this cottage"],
    trim: true,
    lowercase: true
},

}, {timestamps: true} //Protocolo de seguridad

)

export default mongoose.model("Cottage", cottageSchema )