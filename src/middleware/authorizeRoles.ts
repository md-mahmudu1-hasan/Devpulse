import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
             return next(
                new AppError(404, "user not found")
             )
        }

        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(403, "Forbidden")
            )
        }
        next();
    };
};