import mongoose from "mongoose";
import { binomialNameRegex, validDomainRegex } from "../../utils/constants/generalConstants.js";

const naturalElementSchema = new mongoose.Schema({

name:{
    type: String,
    required: [true, "The name of the natural element is required"],
    trim: true,
    lowercase: true,
    minLength: [3, "At least 3 characters are required to name this element"],
    maxLength: [256, "At most 256 characters are required to name this element"]

},
binomialName:{
    type: String,
    required: [true, "The binomial name of the natural element is required"],
    // no se añade el lowercase: true debido a que, por convención científica, los nombres binomiales empiezan con mayúscula
    unique: true, // Cada especie tiene una nomenclatura única
    minLength: [3, "At least 3 characters are required to name this element"],
    maxLength: [256, "At most 256 characters are required to name this element"],
    match: [binomialNameRegex, "The binomial name is not in the correct format. As an example: 'Canis lupus'" ],
    trim: true
},
description:{
    type: String,
    required: [true, "The description of the natural element is required"],
    minLength: [3, "At least 3 characters are required to describe this element"],
    maxLength: [512, "At most 512 characters are required to describe this element"],
    trim: true,
    lowercase: true,
},
image:{
    type: String, // link
    required: [true, "The link of the image of the natural element is required"],
    match: validDomainRegex,
    trim: true
},
info:{
    type: String, // link
    required: [true, "The link of info about the natural element is required"],
    match: validDomainRegex,
    trim: true
},

}, {timestamps: true} //Protocolo de seguridad
)

export default mongoose.model("NaturalElement", naturalElementSchema)