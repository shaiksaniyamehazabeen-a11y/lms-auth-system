
import { RequestHandler } from "express";
import { UserRole } from "../models/User";
import { AuthenticatedRequest } from "./authenticate";

const authorize = (...allowedRoles: UserRole[]): RequestHandler => {
    return (req, res, next): void => {
        const authUser = (req as AuthenticatedRequest).authUser;

        if (!authUser) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
            });
            return;
        }

        if (!allowedRoles.includes(authUser.role)) {
            res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission",
            });
            return;
        }

        next();
    };
};

export default authorize;
