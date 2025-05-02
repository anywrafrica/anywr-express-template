import {Request} from "express";

export default function getLanguage(request: Request) {
    const supportedLocales = ['fr', 'en'];
    const defaultLocale = 'en';

    let locale = request.cookies?.locale as string;

    if (!locale && request.headers["accept-language"]) {
        const acceptLanguageHeader = request.headers["accept-language"] as string;
        const acceptedLanguages = acceptLanguageHeader.split(',').map(lang => lang.split(';')[0].trim());

        locale = acceptedLanguages.find(lang => supportedLocales.includes(lang)) || defaultLocale;
    } else if (!locale) {
        locale = defaultLocale;
    }
    return locale;
}