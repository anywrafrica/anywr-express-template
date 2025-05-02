import crypto from "node:crypto"
import logger from "@configs/logger";

export default async function generatePassword(length = 8): Promise<string> {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '@#$%&+=';
    const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;
    const allCharsLength = allCharacters.length;

    // Function to obtain multiple random bytes
    function getRandomBytes(count: number): Buffer {
        return crypto.randomBytes(count);
    }

    // Minimum length check
    if (length < 8) {
        logger.error(`❌ Password generation failed: length: ${length} is too short`, {label: "Password generation"});
        throw new Error('The password must be at least 8 characters long.');
    }

    let password = '';
    const initialBytes = getRandomBytes(4); // One byte for each initial type
    password += upperCaseLetters[initialBytes[0] % upperCaseLetters.length];
    password += lowerCaseLetters[initialBytes[1] % lowerCaseLetters.length];
    password += numbers[initialBytes[2] % numbers.length];
    password += specialCharacters[initialBytes[3] % specialCharacters.length];

    const remainingLength = length - 4;
    if (remainingLength > 0) {
        const randomBytes = getRandomBytes(remainingLength);
        for (let i = 0; i < remainingLength; i++) {
            password += allCharacters[randomBytes[i] % allCharsLength];
        }
    }

    // Fisher-Yates shuffle for better mixing
    function shuffleString(string: string) {
        const array = string.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    password = shuffleString(password);

    return password;
}