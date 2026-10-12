
import {
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../models/User";

export interface AuthenticatedRequest extends Request {
    authUser?: {
        userId: number;
        role: UserRole;
    };
}

interface TokenPayload extends JwtPayload {
    userId: number;
    role: UserRole;
}

const authenticate: RequestHandler = (
    req,
    res,
    next
): void => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Access denied. Bearer token is required.",
        });
        return;
    }

    const token = authorization.slice(7).trim();
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
        res.status(401).json({
            success: false,
            message: "Invalid or missing authentication token.",
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, secret);

        if (
            typeof decoded === "string" ||
            typeof decoded.userId !== "number" ||
            !["student", "instructor", "admin"].includes(
                String(decoded.role)
            )
        ) {
            res.status(401).json({
                success: false,
                message: "Invalid authentication token.",
            });
            return;
        }

        const payload = decoded as TokenPayload;

        (req as AuthenticatedRequest).authUser = {
            userId: payload.userId,
            role: payload.role,
        };

        next();
    } catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

export default authenticate;
