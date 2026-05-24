import type { NextFunction, Request, Response } from "express"
import type { IErrorResponse } from "../types/index"

interface IError extends Error {
    statusCode?: number
    errors?: Record<string, unknown>
}

const globalErrorHandler = (
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = error.statusCode || 500
    const message = error.message || "Something went wrong"

    const errorResponse: IErrorResponse = {
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            errors: error.errors || {
                message: error.message,
                stack: error.stack,
            },
        }),
    }

    res.status(statusCode).json(errorResponse)
}

export default globalErrorHandler