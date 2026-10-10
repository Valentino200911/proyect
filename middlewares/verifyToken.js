import jwt from "jsonwebtoken"
import { ErrorApp } from "../utils/ErrorApp.js"
import { JWT_SECRET } from "../utils/config.js";

export const verifyToken = (req, res, next) => {
    
    const header = req.headers.authorization || ""

    if (!header.startsWith("Bearer ")) {
        
        throw new ErrorApp("There has been an error with the token", 401);

    }

    const token = header.slice(7)

    try {
        
        const payload = jwt.verify(token, JWT_SECRET)

        req.user = {id: payload.id, role: payload.role}

        next()

    } catch (error) {
        
        if (error.name === "TokenExpiredError") {

            throw new ErrorApp("The token has expired, try to login again", 401);

        }

            throw new ErrorApp("The token is invalid", 401);

    }
    
}