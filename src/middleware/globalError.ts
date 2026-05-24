import type { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: error.message || "Something went wrong",
        error: process.env.NODE_ENV === "development" ? error : undefined,
    });
};

export default globalErrorHandler;