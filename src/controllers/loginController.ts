
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/User";

export const login = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await findUserByEmail(email.trim().toLowerCase());

        if (!user || !user.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const secret = process.env.JWT_SECRET;

        if (!secret || secret === "your_super_secret_jwt_key") {
            return res.status(500).json({
                success: false,
                message: "JWT_SECRET is not configured securely",
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            secret,
            {
                expiresIn: "1h",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
};
