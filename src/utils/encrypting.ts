import crypto from 'node:crypto';

interface Data {
    iv: string;
    encrypted: string;
}

export default class encrypting {

    private static key = Buffer.from(process.env['CRYPTO_SECRET_KEY'], 'hex');
    private static iv = crypto.randomBytes(16);

    static async encode(data: string): Promise<Data> {
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.key), this.iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {
            iv: this.iv.toString('hex'),
            encrypted: encrypted.toString('hex'),
        }
    }

    static async decode(data: Data): Promise<string> {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.key), Buffer.from(data.iv, 'hex'));
        let decrypted = decipher.update(Buffer.from(data.encrypted, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}