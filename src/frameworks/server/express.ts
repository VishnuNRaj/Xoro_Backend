import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";

const expressConfig:Function = (app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use(helmet({ xssFilter: true }));
    app.use(mongoSanitize());
    app.use(cors());
};

export default expressConfig;
