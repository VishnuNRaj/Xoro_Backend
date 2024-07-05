// src/middleware/errorHandler.ts
import { Application, Request, Response, NextFunction } from 'express';
import {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InvalidCredentialsError,
    // InternalServerError
} from './error';

export default function ErrorHandler(app: Application) {
    app.use((err: any, res: Response) => {
        console.error(err.stack);

        if (err instanceof BadRequestError) {
            res.status(400).json({ error: err.message });
        } else if (err instanceof UnauthorizedError) {
            res.status(401).json({ error: err.message });
        } else if (err instanceof InvalidCredentialsError) {
            res.status(400).json({ error: err.message });
        } else if (err instanceof ForbiddenError) {
            res.status(403).json({ error: err.message });
        } else if (err instanceof NotFoundError) {
            res.status(404).json({ error: err.message });
        } else if (err instanceof ConflictError) {
            res.status(409).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
