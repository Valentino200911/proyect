
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { emailRegex, phoneNumberRegex, ROLES } from "../../utils/constants/generalConstants.js";
import { ITERATIONS } from "../../utils/constants/systemConstants.js";

const userSchema = new mongoose.Schema({

name: {
    type: String,
    required: [true, "Your name is required for your account"],
    trim: true,
    lowercase: true,
    minLength: [3, "At least 3 characters are required"],
    maxLength: [256, "At most 256 characters are required"]
},
surname: {
    type: String,
    required: [true, "Your surname is required for your account"],
    trim: true,
    lowercase: true,
    minLength: [3, "At least 3 characters are required"],
    maxLength: [256, "At most 256 characters are required"]  
},
birthDate: {
    type: Date,
    required: [true, "Your birth date is required for your account"],
    min: ["1900-01-01", "It is imposible to be over 125 years, select your actual date of birth"],
    trim: true,
    //No se incluye max. porque tendría que estar constantemente actualizándose
},
phoneNumber: {
    type: String,
    required: [true, "Your phone number is required for your account"],
    unique: true,
    index: true,
    trim: true,
    match: [phoneNumberRegex, "Your phone number is not valid. Try again and write it correctly"],
},
email: {
    type: String,
    required: [true, "Your email is required for your account"],
    trim: true,
    lowercase: true,
    match: [emailRegex, "Your email is not valid"],
    unique: true
},
password: {
    type: String,
    required: [true, "The password is required"],
    minLength: [8, "Your password needs at least 8 characters"],
    select: false,
},
role: {
    type: String,
    enum: {values: ROLES, message: "The only role available at login is 'user'"},
    default: "user"
},

}, {timestamps: true, //Protocolo de seguridad

    toJSON: {

        transform: (doc, ret) => {

            delete ret.password
            return ret
        }

    }

} 

)

// Pre save hook

userSchema.pre("save", async function () {
    
    if (!this.isModified("password")) return 
    
    this.password = await bcrypt.hash(this.password, ITERATIONS)
    

})

// Instancia
userSchema.methods.comparePassword = function (password) {
    
    return bcrypt.compare(password, this.password)
    
}

export default mongoose.model("User", userSchema)