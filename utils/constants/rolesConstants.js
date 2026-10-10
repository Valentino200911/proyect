import { allowRoles } from "../../middlewares/allowRoles.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { ROLES } from "./generalConstants.js";

// Permisos existentes centralizados

    // Restringido a user

    export const userOnly = [verifyToken, allowRoles("user")]

    // Restringido a admin

    export const adminOnly = [verifyToken, allowRoles("user")]

    // Permitido a todos los roles

    export const allowed = [verifyToken, allowRoles("user", "admin")]