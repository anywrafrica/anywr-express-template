import 'express';

declare module 'express' {
    export interface Request {
        locale?: string;
    }
}