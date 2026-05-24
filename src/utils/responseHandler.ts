import type { Response } from 'express'
import type { IErrorResponse, ISuccessResponse } from '../types/index'

export const sendErrorResponse = (
    res: Response,
    statusCode: number,
    message: string,
    errors?: Record<string, unknown>
): void => {
    const errorResponse: IErrorResponse = {
        success: false,
        message,
        ...(errors && { errors }),
    }
    res.status(statusCode).json(errorResponse)
}

export const sendSuccessResponse = <T = unknown>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T
): void => {
    const successResponse: ISuccessResponse<T> = {
        success: true,
        message,
        ...(data && { data }),
    }
    res.status(statusCode).json(successResponse)
}
