export const unauthorizedErrorMessage = {
    en: "Your session has expired or you do not have authorization to access this resource",
    fr: "Votre session a expirée ou vous n'avez pas d'autorisation pour accéder à cette ressource"
}

export const existingUserErrorMessage = {
    en: "User already exists",
    fr: "L'utilisateur existe déjà"
}

export const existingRoleErrorMessage = {
    en: "The role you are trying to create already exists",
    fr: "Le rôle que vous avez essayé de créer existe déjà"
}

export const notFound = {
    fr: "Aucune ressource demandée n'a été trouvée",
    en: "The requested resource was not found",
}

export const mandatoryInfoMissing = {
    en: "Missing mandatory information",
    fr: "Informations obligatoires manquantes"
}

export const alreadyExist = {
    en: "There is already a record with the same name!",
    fr: "Il existe déjà un enregistrement portant le même nom !"
}

export const emailAlreadyExist = {
    fr: "Il existe déjà un compte avec la même adresse email !",
    en: "There is already an account with the same email!",
}

export const phoneAlreadyExist = {
    fr: "Il existe déjà un compte avec le même numéro de téléphone !",
    en: "There is already an account with the same phone number!",
}

export const employeeAlreadyExist = {
    en: "This person is already one of your employees",
    fr: "Cette personne fait déjà partie de vos employés"
}

export const badEmailCredentials = {
    fr: "L'adresse email ou le mot de passe fourni est incorrect.",
    en: "The email or password provided is incorrect."
}

export const badPinCredentials = {
    fr: "Le code employé ou le PIN fourni est incorrect.",
    en: "The employee code or PIN provided is incorrect."
}

export const passwordNoMatch = {
    fr: "Le mot de passe fourni ne correspond pas à celui en cours d'utilisation.",
    en: "The password provided does not match the one currently in use."
}

export const userBlocked = {
    fr: "Ce compte est désactivé ou supprimé. Veuillez contacter votre administrateur.",
    en: "This account is disabled or deleted. Please contact your administrator."
}

export const emailNotVerified = {
    fr: "L'adresse e-mail n'a pas été vérifiée. Veuillez vérifier votre adresse e-mail et réessayer.",
    en: "The email has not been verified. Please verify your email and try again."
}

export const phoneNumberNotVerified = {
    fr: "Le numéro de téléphone n'a pas été vérifié. Veuillez vérifier votre numéro de téléphone et réessayer.",
    en: "The phone number has not been verified. Please verify your phone number and try again."
}

export const otpNotMatchWithChecker = {
    fr: "Le code d'authentification fourni ne correspond pas à l'adresse e-mail ou au numéro de téléphone fourni.",
    en: "The authentication code provided does not match the email or phone number provided."
}

export const otpExpiredOrNotExist = {
    fr: "Le code d'authentification fourni n'est pas valide ou a expiré.",
    en: "The authentication code provided is not valid or has expired."
}

export const invalidOtp = {
    fr: "Code d'authentification invalide. Veuillez réessayer.",
    en: "Invalid authentication code. Please try again."
}

export const loginRateLimitExceeded = (minutes: number, locale: 'fr' | 'en') => {
    if (locale === 'fr') {
        return `Vous avez dépassé le nombre maximal de tentatives de connexion. Veuillez réessayer dans ${minutes} minutes.`;
    }
    return `You have exceeded the maximum number of login attempts. Please try again in ${minutes} minutes.`;
}

export const rateLimitExceeded = {
    fr: "Trop de requêtes envoyées au serveur, veuillez réessayer plus tard.",
    en: "Too many requests sent to the server, please try again later."
}

export const accountTemporarilyBlocked = {
    fr: "Votre compte est temporairement bloqué en raison de plusieurs tentatives de connexion échouées. Veuillez réessayer plus tard.",
    en: "Your account is temporarily blocked due to multiple failed login attempts. Please try again later."
}

export const OTPMessage = (code: number, locale: 'fr' | 'en') => {
    if (locale === 'fr') {
        return `Votre code de vérification est ${code}. Pour votre sécurité, ne le partagez pas.`
    }
    return `${code} is your verification code. For your security, do not share this code.`
}

export const SignupAsCompleted = {
    fr: 'Veuillez vous connecter ou réinitialiser votre mot de passe.',
    en: 'Please login or reset your password'
}

export const EmptyEmailAndPhoneNumber = {
    en: 'Please use a valid e-mail address or phone number to continue.',
    fr: 'Veuillez utiliser une adresse e-mail ou un numéro de téléphone valide pour continuer.'
}