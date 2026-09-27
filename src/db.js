import mongoose from "mongoose";
import { PORT, MONGO_URI } from "../utils/config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`The connection with MongoDB was successful. Check the collection "cabañas_aguaribay" to analyse it`)
    } catch (error) {
        throw new ErrorApp(`Unsuccessful connection. It was not possible to connect to MongoDB due to ${error.message}`)
        process.exit(1)
    }
}