import mongoose from "mongoose";

const cabañaSchema = new mongoose.Schema({

name:{
    type: String,

},
capacity:{},
pricePerNightAndPerson: {},
location:{},
description:{},

}, {timestamps: true,} //Protocolo de seguridad

)

export default mongoose.model("Cabaña", cabañaSchema )