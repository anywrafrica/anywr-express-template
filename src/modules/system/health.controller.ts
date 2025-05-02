import mongoose from "mongoose";
import {i18n} from "@configs/i18n";
import {format, formatDistanceToNow} from 'date-fns';
import {BaseHttpController, Controller, Get} from '@common/http';
import {redisClient} from "@configs/database/redis";
import {unauthorizedErrorMessage} from "@utils/messages";

@Controller('/health')
export class HealthController extends BaseHttpController {

    private static cache: any = null;
    private static lastChecked = 0;
    private static readonly CACHE_DURATION = 10 * 1000; // 10 sec

    @Get('/')
    public async check() {

        const now = Date.now();
        const isCacheValid = HealthController.lastChecked + HealthController.CACHE_DURATION > now;

        if (isCacheValid && HealthController.cache) {
            return this.json(HealthController.cache.body, HealthController.cache.statusCode);
        }

        const clientToken = this.httpContext.request.headers['x-health-token'];
        const locale = this.httpContext.request.headers['accept-language'] || i18n.defaultLocale;
        const expectedToken = process.env.HEALTH_SECRET;

        if (expectedToken && clientToken !== expectedToken) {
            return this.json({
                statusCode: 401,
                statusText: "Unauthorized",
                message: unauthorizedErrorMessage[locale]
            }, 401)
        }

        try {
            const mongoStatus = await mongoose.connection.db.admin().ping().catch(() => null);
            const redisStatus = await redisClient.ping().catch(() => null);

            const allUp = mongoStatus && redisStatus === 'PONG';
            const statusCode = allUp ? 200 : 503;

            const body = {
                status: allUp ? 'running...' : 'degraded',
                name: process.env.npm_package_name,
                version: process.env.npm_package_version,
                uptime: formatDistanceToNow(new Date(Date.now() - process.uptime() * 1000)),
                timestamp: format(new Date(), "PPPP HH:mm"),
                node: process.version,
                services: {
                    mongo: mongoStatus ? 'up' : 'down',
                    redis: redisStatus === 'PONG' ? 'up' : 'down',
                }
            };

            HealthController.cache = {body, statusCode};
            HealthController.lastChecked = now;

            return this.httpContext.response.status(statusCode).json(body);
        } catch (e) {
            return this.json({
                statusCode: 500,
                statusText: 'error',
                error: e.message,
            }, 500)
        }
    }
}