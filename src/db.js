import mongoose from "mongoose";
import { MONGO_URI } from "./utils/config.js";
import { MONGO_URI_PROVIDERS } from "./utils/exporter.js";

if (!MONGO_URI_PROVIDERS.includes(MONGO_URI)) {
    
    throw new Error(`MONGO_URI = "${MONGO_URI}" does not exists. To connect to a DB, it has to be: ${MONGO_URI_PROVIDERS.join(", ")}`)

}

export const connectDB = async () => {
    
    try {
        await mongoose.connect(MONGO_URI)
        
        console.log(`The connection with MongoDB was successful. Check the collection ${MONGO_URI} to analyse it`)

    } catch (error) {

        console.error(`Unsuccessful connection. It was not possible to connect to MongoDB due to ${error.message}`)

        process.exit(1)
    }
}
