export default function formatPhoneNumber(phoneNumber: string): number {
    const formattedNumber = '0' + phoneNumber.replace(/\s+/g, '').substring(4);
    return Number(formattedNumber);
}