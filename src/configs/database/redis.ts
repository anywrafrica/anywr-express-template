import Redis from 'ioredis';
import logger from "@configs/logger";
import {NextFunction, Request, Response} from "express";

function createRedisClient(name: string) {
    const client = new Redis({
        maxRetriesPerRequest: 1,
        retryStrategy: times => {
            if (process.env.NODE_ENV === "production") {
                return Math.min(times * 100, 2000);
            } else {
                return null;
            }
        }
    });

    client.on('connect', () => {
        logger.info(`✅ Redis client "${name}" connected`);
    });

    client.on('error', (err) => {
        logger.error(`❌ Redis client "${name}" error: ${err.message}`);
    });

    return client;
}

export const redisClient = createRedisClient("main");

export default async function initRedis() {
    try {
        await redisClient.ping();
        logger.info('✅ Redis main client is available');
    } catch (err) {
        logger.error('💥 Redis main client not available:', err.message);
    }

    try {
        await subscriberClient.ping();
        await subscriberClient.subscribe('session-events');
        await subscriberClient.psubscribe('__keyevent@0__:expired');
    } catch (err) {
        logger.warn('⚠️ Redis subscriber setup failed:', err.message);
    }
}

export const subscriberClient = createRedisClient("subscriber");
export const publisherClient = createRedisClient("publisher");

// Ajouter un token révoqué à Redis
export const revokeToken = async (token: string, expiresIn: number) => {
    try {
        await redisClient.setex(`revoked:${token}`, expiresIn, "1");
    } catch (err) {
        logger.warn('⚠️ Failed to revoke token:', err.message);
    }
};

// Vérifier si un token est révoqué
export const isTokenRevoked = async (token: string) => {
    try {
        return (await redisClient.get(`revoked:${token}`)) !== null;
    } catch (err) {
        logger.warn('⚠️ Could not check token revocation:', err.message);
        return false; // Par défaut, on suppose qu’il est valide
    }
};

// Middleware Express pour vérifier la révocation
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    if (await isTokenRevoked(token)) {
        return res.status(401).json({ message: "Token revoked" });
    }
    next();
};