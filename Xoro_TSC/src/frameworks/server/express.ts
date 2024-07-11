import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import cookies from "cookie-parser"
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";
import CorsConfig from "../../config/cors" 
const expressConfig: Function = (app: Application) => {
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '100mb', extended: true }));
    app.use(morgan('dev'));
    app.use(helmet({ xssFilter: true }));
    app.use(mongoSanitize());
    app.use(cookies())
    app.use(cors(CorsConfig));
};

export default expressConfig;
