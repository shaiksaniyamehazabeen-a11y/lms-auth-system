
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db";

export type UserRole = "student" | "instructor" | "admin";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string | null;
    role: UserRole;
    google_id: string | null;
    created_at?: Date;
    updated_at?: Date;
}

interface UserRow extends RowDataPacket, User {}

export const findUserByEmail = async (
    email: string
): Promise<User | null> => {
    const [rows] = await pool.execute<UserRow[]>(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email]
    );

    return rows[0] ?? null;
};

export const findUserById = async (
    id: number
): Promise<User | null> => {
    const [rows] = await pool.execute<UserRow[]>(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [id]
    );

    return rows[0] ?? null;
};

export const createUser = async (
    name: string,
    email: string,
    password: string | null,
    role: UserRole,
    googleId: string | null = null
): Promise<number> => {
    const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO users (name, email, password, role, google_id)
         VALUES (?, ?, ?, ?, ?)`,
        [name, email, password, role, googleId]
    );

    return result.insertId;
};
