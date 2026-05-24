import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { TLoginUser, TSignupUser } from "./auth.interface";
import config from "../../config";
import jwt from "jsonwebtoken";
import AppError from "../../utils/appError";

const signupUserInDB = async (payload: TSignupUser) => {
    const { name, email, password, role } = payload

    if (!name || !email || !password || !role) {
        throw new AppError(404, "Missing required fields");
    }


    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (existingUser.rows.length > 0) {
        throw new AppError(400, 'User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at',
        [ name, email, hashedPassword, role]
    )
    return result.rows[0]
}

const loginUserInDB = async (payload: TLoginUser) => {
    const { email, password } = payload

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (existingUser.rows.length === 0) {
        throw new AppError(401, 'Invalid email or password')
    }

    const user = existingUser.rows[0]

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new AppError(401, 'Invalid email or password')
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
        expiresIn: "1d",
    });

    const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };


    return {
         token,
         user: userResponse
    }
}

export const authService = {
    signupUserInDB,
    loginUserInDB
}