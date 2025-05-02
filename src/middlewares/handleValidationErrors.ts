import {injectable} from "inversify";
import {ValidationError} from "class-validator";
import {inject} from "inversify";
import {TranslationService} from "@services/translation.service";
import {Request} from "express";

@injectable()
export class ValidationErrorHandler {

    @inject(TranslationService) private readonly _translator: TranslationService;

    public handler(err: any, req: any, res: any, next: any) {
        if (Array.isArray(err) && err[0] instanceof ValidationError) {
            const errors: Record<string, string> = {};
            err.forEach((error: ValidationError) => {
                const constraints = error.constraints;
                if (constraints) {
                    const firstKey = Object.keys(constraints)[0];
                    const messageKey = constraints[firstKey];
                    errors[error.property] = this._translator.translate(messageKey, error.property, req as Request);
                }
            });
            return res.status(400).json({
                statusCode: 400,
                statusText: "validation_error",
                errors,
            });
        }
        next(err);
    }
}