import {plainToInstance} from 'class-transformer';
import {validate, ValidationError} from 'class-validator'; // Importez ValidationError
import {Request, Response, NextFunction} from 'express';
import {TranslationService} from '@services/translation.service';
import {container} from '@configs/inversify/container';
import {AppError} from 'src/utils';

export default function Validate(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject, {
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            const translator = container.get(TranslationService);
            const formattedErrors: { property: string; message: string }[] = [];

            function formatError(error: ValidationError) {
                const property = error.property;

                if (error.constraints) {
                    const firstConstraintKey = Object.keys(error.constraints)[0];
                    const key = error.constraints[firstConstraintKey];
                    const message = translator.translate(key, property, req, error);
                    formattedErrors.push({property, message});
                } else if (error.children && error.children.length > 0) {
                    error.children.forEach(formatError);
                } else {
                    formattedErrors.push({
                        property,
                        message: translator.translate('validation.unknownError', property, req)
                    });
                }
            }

            errors.forEach(formatError);

            const message = translator.translate('validation.failed', '', req) + ': ' + formattedErrors
                .map(e => `${e.property} → ${e.message}`)
                .join('; ');

            return next(new AppError(message, 422, {errors: formattedErrors}));
        }

        req.body = dtoObject;
        next();
    };
}