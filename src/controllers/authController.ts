
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
    createUser,
    findUserByEmail,
    UserRole,
} from "../models/User";

export const register = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { name, email, password } = req.body;

        // Public registration must not allow privileged role selection.
        const role: UserRole = "student";

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
        }

        if (
            typeof name !== "string" ||
            name.trim().length < 2 ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid name, email, and password values",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        const existingUser = await findUserByEmail(normalizedEmail);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const userId = await createUser(
            name.trim(),
            normalizedEmail,
            hashedPassword,
            role
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: userId,
                name: name.trim(),
                email: normalizedEmail,
                role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred during registration",
        });
    }
};
