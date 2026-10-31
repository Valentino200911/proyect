import { app } from "./app.js";
import { connectDB } from "./db.js";
import { PORT } from "./utils/config.js";

// Conexión a la DB

    await connectDB()

// PORT y Visualización

    app.listen(PORT, () => {

        console.log(`Server working on http://localhost:${PORT}`);
        console.log(`Route of Natural Elements on http://localhost:${PORT}/api/naturalelement`)
        console.log(`Route of Users on http://localhost:${PORT}/api/user`)
        console.log(`Route of Cottages on http://localhost:${PORT}/api/cottage`)
        console.log(`Route of Contacts on http://localhost:${PORT}/api/contact`)
        console.log(`Route of Auth on http://localhost:${PORT}/api/auth`)

    })