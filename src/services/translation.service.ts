import {getLanguage, Inject, Injectable} from "@utils/index";
import {Interfaces, TYPE} from "@common/http";
import {Request} from "express";

@Injectable()
export class TranslationService {
    @Inject(TYPE.HttpContext)
    private readonly _httpContext: Interfaces.HttpContext;

    private messages = {
        fr: {
            'validation.isNotEmpty': '{property} ne doit pas être vide.',
            'validation.isEmail': '{property} doit être une adresse email valide.',
            'validation.isPhoneNumber': '{property} doit être un numéro de téléphone valide.',
            'validation.isString': '{property} doit être une chaîne de caractères.',
            'validation.minLength': '{property} doit contenir au moins {value} caractères.',
            'validation.maxLength': '{property} ne doit pas dépasser {value} caractères.',
            'validation.matches': '{property} ne respecte pas le format requis.',
            'validation.isNumber': '{property} doit être un nombre.',
            'validation.isInt': '{property} doit être un entier.',
            'validation.isBoolean': '{property} doit être vrai ou faux.',
            'validation.isDate': '{property} doit être une date valide.',
            'validation.isArray': '{property} doit être un tableau.',
            'validation.arrayNotEmpty': '{property} ne doit pas être un tableau vide.',
            'validation.isOptional': '{property} est facultatif.',
            'validation.isMandatory': '{property} is mandatory',
            'validation.isNotMatch': '{property} ne correspond pas',
            'validation.passwordRequired': '{property} Le mot de passe actuel est obligatoire.',
            'validation.passwordNotMatch': 'La confirmation du mot de passe ne correspond pas au nouveau mot de passe.',
            'validation.email.required_if_no_phone': "L'adresse email est obligatoire si le numéro de téléphone n'est pas fourni.",
            'validation.email.format': "L'adresse email doit être au bon format.",
            'validation.phone.required_if_no_email': "Le numéro de téléphone est obligatoire si l'adresse email n'est pas fournie.",
            'validation.phone.format': "Le numéro de téléphone doit être valide.",
            'validation.token.required': 'Le token de réinitialisation est obligatoire.',
            'validation.status.in': 'Le statut doit être une des valeurs autorisées.',
            "validation.isDefined": "{property} est obligatoire.",
            "validation.isObject": "{property} doit être un objet.",
            'validation.failed': 'La validation a échoué',
            'validation.unknownError': 'Erreur de validation inconnue pour le champ {property}',
            'validation.isMongoId': '{property} doit être un ID MongoDB valide.',
            'validation.isEnum': '{property} doit être une des valeurs suivantes : {constraints}.',
            'validation.arrayMinSize': '{property} doit contenir au moins {constraints} éléments.',
            'validation.isUrl': '{property} doit être une URL valide.',
            'validation.min': '{property} doit être supérieur ou égal à {constraints}.',
        },
        en: {
            'validation.isNotEmpty': '{property} should not be empty.',
            'validation.isEmail': '{property} must be a valid email address.',
            'validation.isPhoneNumber': '{property} must be a valid phone number.',
            'validation.isString': '{property} must be a string.',
            'validation.minLength': '{property} must be at least {value} characters long.',
            'validation.maxLength': '{property} must not exceed {value} characters.',
            'validation.matches': '{property} does not match the required pattern.',
            'validation.isNumber': '{property} must be a number.',
            'validation.isInt': '{property} must be an integer.',
            'validation.isBoolean': '{property} must be true or false.',
            'validation.isDate': '{property} must be a valid date.',
            'validation.isArray': '{property} must be an array.',
            'validation.arrayNotEmpty': '{property} should not be an empty array.',
            'validation.isOptional': '{property} is optional.',
            'validation.isMandatory': '{property} is mandatory',
            'validation.isNotMatch': '{property} is not match',
            'validation.passwordRequired': '{property} The current password is required',
            'validation.passwordNotMatch': 'The password confirmation does not match the new password.',
            'validation.email.required_if_no_phone': 'The email is mandatory if the phone number is not provided.',
            'validation.email.format': 'The email address must be in a valid format.',
            'validation.phone.required_if_no_email': 'The phone number is mandatory if the email is not provided.',
            'validation.phone.format': 'The phone number must be valid.',
            'validation.token.required': 'The reset token is required.',
            'validation.status.in': 'Status must be one of the allowed values.',
            "validation.isDefined": "{property} field is required.",
            "validation.isObject": "{property} field must be an object.",
            'validation.failed': 'Validation failed',
            'validation.unknownError': 'Unknown validation error for field {property}',
            'validation.isMongoId': '{property} must be a valid MongoDB ID.',
            'validation.isEnum': '{property} must be one of the following values: {constraints}.',
            'validation.arrayMinSize': '{property} must contain at least {constraints} elements.',
            'validation.isUrl': '{property} must be a valid URL.',
            'validation.min': '{property} must be greater than or equal to {constraints}.',
        }
    };

    translate(key: string, property: string, req: Request, args: Record<string, any> = {}): string {
        const lang = getLanguage(req);
        const locale = this.messages[lang] ? lang : 'en';
        let messageTemplate = this.messages[locale][key];

        if (messageTemplate) {
            messageTemplate = messageTemplate.replace('{property}', property);
            messageTemplate = messageTemplate.replace(/\{(\w+)\}/g, (_, argKey) => {
                return args[argKey] !== undefined ? args[argKey] : `{${argKey}}`;
            });
            return messageTemplate;
        } else {
            return key;
        }
    }
}