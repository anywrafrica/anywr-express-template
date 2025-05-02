import 'reflect-metadata';
import '@modules/loader';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import socketIo from 'socket.io';
import helmet from "@middlewares/helmet";
import rateLimiter from "@middlewares/rateLimiter";
import badUrl from "@middlewares/badUrl";
import cors, {authorizedDomains} from '@middlewares/cors';
import {normalizePort} from 'src/utils';
import {initMongo, logger, initRedis} from 'src/configs';
import {InversifyExpressServer} from 'inversify-express-utils';
import {ErrorHandler} from "@middlewares/errorHandler";
import {container} from "@configs/inversify/container";

dotenv.config();
const PORT = normalizePort(process.env.PORT || '3001');

const server = new InversifyExpressServer(container, null, {
    rootPath: '/api/v1'
});

server.setConfig(app => {
    app.set('trust proxy', true);
    app.set('port', PORT);

    app.use(express.json());
    app.use(helmet);
    app.use(cors);
    app.use(rateLimiter);

    app.use((req, _res, next) => {
        logger.info(`${req.method} ${req.originalUrl}`, {label: 'HTTP'});
        next();
    });
});

server.setErrorConfig(app => {
    app.all(/^.*$/, badUrl);

    const errorMiddleware = container.get<ErrorHandler>("ErrorHandler");
    app.use(errorMiddleware.handler);
});

const app = server.build();

const httpServer = http.createServer(app);

const io = new socketIo.Server(httpServer, {
    cors: {
        origin: authorizedDomains,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

// sockets
io.on('connection', socket => {
    logger.info(`🔌 Socket connected: ${socket.id}`, {label: 'Socket.IO'});
    socket.on('disconnect', () => {
        logger.info(`❌ Socket disconnected: ${socket.id}`, {label: 'Socket.IO'});
    });
});

(async () => {
    await initMongo();
    await initRedis();

    httpServer.listen(PORT, () => {
        logger.info(`🚀 Server is running on port ${PORT}`);
    });
})();

process.on('unhandledRejection', reason => {
    logger.error('💥 Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', err => {
    logger.error('💥 Uncaught Exception:', err);
    process.exit(1);
});

export {app, io};