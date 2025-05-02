import express from "express";
import logger from "@configs/logger";
import {getLanguage, Injectable} from "src/utils";
import {unauthorizedErrorMessage} from "@utils/messages";

@Injectable()
export class ErrorHandler {

    public handler = (err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {

        const statusCode = err.statusCode || 500;
        const locale = getLanguage(req)

        logger.error(`[${req.method}] ${req.originalUrl} -> ${err.message}`, {
            label: "ErrorHandler",
            stack: err.stack,
            statusCode,
        });

        const isUnauthorized = err.name === "UnauthorizedError";
        const message = isUnauthorized ? unauthorizedErrorMessage[locale] : err.message;

        const response = {
            statusCode: isUnauthorized ? 401 : statusCode,
            message,
            ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
        };

        res.status(response.statusCode).json(response);
    };
}