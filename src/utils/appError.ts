class AppError extends Error {
    statusCode: number
    errors?: Record<string, unknown>

    constructor(
        statusCode: number,
        message: string,
        errors?: Record<string, unknown>
    ) {
        super(message)

        this.statusCode = statusCode
        if (errors) {
            this.errors = errors
        }

        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError