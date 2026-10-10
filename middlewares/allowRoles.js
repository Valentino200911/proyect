import { ErrorApp } from "../utils/ErrorApp.js";

export const allowRoles =  (...roles) => {
    
    return (req, res, next) => {
        
        if (!roles.includes(req.user.role)) {
            
            throw new ErrorApp(`This action require the role: "${roles.join(", ")}"`, 403) // 403, Forbidden;
            
        }
        next()
    }
}