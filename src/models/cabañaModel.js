import mongoose from "mongoose";
import { LOCATION } from "../../utils/constants/generalConstants.js";

const cabañaSchema = new mongoose.Schema({

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
    min: 2,
    max: 7
},
pricePerNightAndPerson: {
    type: Number,
    required: [true, "The price is required for the register"],
    min: [20000, "The price for one person during one night must be over 20000"],
    max: [100000, "The price for one person during one night must be over 100000"],
},
location:{
    type: String,
    required: [true, "The location is required for the register"],
    enum: LOCATION,
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

export default mongoose.model("Cabaña", cabañaSchema )