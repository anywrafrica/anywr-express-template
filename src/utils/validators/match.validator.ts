import {ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator,} from 'class-validator';

@ValidatorConstraint({async: false})
export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: any) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(args: any) {
        const [relatedPropertyName] = args.constraints;
        return `${args.property} must match ${relatedPropertyName}`;
    }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}