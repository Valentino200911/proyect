import dotenv  from "dotenv"

const config = dotenv.config()

const PORT = process.env.PORT || 3000

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cabañas_aguaribay"

export {PORT, MONGO_URI }