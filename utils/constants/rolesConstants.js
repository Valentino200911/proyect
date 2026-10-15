
import { allowRoles } from "../../src/middlewares/allowRoles.js";
import { verifyToken } from "../../src/middlewares/verifyToken.js";
import { ROLES } from "./generalConstants.js";

// Permisos existentes centralizados

    // Restringido a user

    export const userOnly = [verifyToken, allowRoles(ROLES.USER)]

    // Restringido a admin

    export const adminOnly = [verifyToken, allowRoles(ROLES.ADMIN)]

    // Permitido a todos los roles

    export const allowed = [verifyToken, allowRoles(ROLES.USER, ROLES.ADMIN)]