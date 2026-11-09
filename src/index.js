import { app } from "./app.js";
import { connectDB } from "./db.js";
import { API_URL, PORT } from "./utils/config.js";

// Conexión a la DB

    await connectDB()

// PORT y Visualización

    app.listen(PORT, () => {

        console.log(`Server working on ${API_URL}`);

        console.log(`Route of Api-Docs on ${API_URL}/api-docs`)

        console.log(`Route of Api-Docs JSON on ${API_URL}/api-docs.json`)

        console.log(`Route of Natural Elements on ${API_URL}/api/naturalelement`)

        console.log(`Route of Reservations on ${API_URL}/api/reservation`)

        console.log(`Route of Users on ${API_URL}/api/user`)

        console.log(`Route of Cottages on ${API_URL}}/api/cottage`)

        console.log(`Route of Contacts on ${API_URL}/api/contact`)

        console.log(`Route of Auth on ${API_URL}/api/auth`)

    })