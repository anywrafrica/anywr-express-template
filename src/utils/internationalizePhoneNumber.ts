import logger from "@configs/logger";

export default function internationalizePhoneNumber(phoneNumber: string, prefix: string): string {
    if (!prefix.startsWith('+')) {
        logger.error(`❌ Invalid phone prefix: "${prefix}". Must start with '+'`, {label: "Phone number validation"});
        throw new Error('The prefix for the phone number must start with a "+"');
    }

    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const trimmedNumber = cleanedNumber.startsWith('0') ? cleanedNumber.substring(1) : cleanedNumber;

    if (trimmedNumber.length < 9) {
        logger.error(`❌ Invalid phone number length: "${trimmedNumber}" (length: ${trimmedNumber.length})`, {label: "Phone number validation"});
        throw new Error('The phone number is not valid');
    }

    return `${prefix} ${trimmedNumber.substring(0, 3)} ${trimmedNumber.substring(3, 6)} ${trimmedNumber.substring(6)}`;
}