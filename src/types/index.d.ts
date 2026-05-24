import { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {
                id: number
                name: string
                role: "contributor" | "maintainer"
            }
        }
    }
}

export interface IErrorResponse {
    success: false
    message: string
    errors?: Record<string, unknown>
}

export interface ISuccessResponse<T = unknown> {
    success: true
    message: string
    data?: T
}