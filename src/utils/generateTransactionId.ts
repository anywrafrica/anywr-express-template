import crypto from 'crypto';

/**
 * Generate a unique transaction ID
 * @param userCode - Initiating user Code
 * @param businessCode - (Optional) Associate Business Code
 * @param type - Transaction type: GEN (generic), DEP (deposit), WDR (withdraw), PAY, etc.
 * @returns Secure, traceable transaction identifier
 */
const generateTransactionId = (userCode: string, businessCode: string, type: string = 'GEN'): string => {
    const timestamp = Math.floor(Date.now() / 1000);

    const shortUser = crypto.createHash('sha256').update(userCode).digest('hex').slice(3, 8).toUpperCase();
    const shortBusiness = crypto.createHash('sha256').update(businessCode).digest('hex').slice(3, 8).toUpperCase();

    const random = crypto.randomBytes(2).toString('hex').toUpperCase();
    const base = `TX-${type}-${shortUser}${shortBusiness}-${timestamp}-${random}`;
    const secret = process.env.TRANSACTION_SECRET || '57d462i6Qd92NnX85lh9n6NEatiBcKdKB';
    const hash = crypto.createHmac('sha256', secret).update(base).digest('hex');
    const signature = hash.substring(0, 6).toUpperCase();
    return `${base}-${signature}`;
};

export default generateTransactionId;