import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import config from "../config";
import AppError from "../utils/appError";

type TDecodedUser = JwtPayload & {
    id: number;
    name: string;
    role: "contributor" | "maintainer";
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) {
        return next(
            new AppError(401, "User is unauthorized")
        )
    }

    const decode = jwt.verify(
        authorizationToken,
        config.jwt_secret as string,
    ) as TDecodedUser;

    req.user = decode;

    const allowedRoles = ["contributor", "maintainer"];
    if (!allowedRoles.includes(req.user.role)) {
         return next(
             new AppError(403, "Only contributors or maintainers can create issues")
         )
    }

    next();
}

export default auth;