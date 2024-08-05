import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser,{CookieParseOptions} from "cookie-parser"
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";
import CorsConfig from "../../config/cors"
import path from "path";
const expressConfig: Function = (app: Application) => {
    app.use(cookieParser())
    app.use(cors(CorsConfig));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '100mb', extended: true }));
    app.use(morgan('dev'));
    app.use(helmet({ xssFilter: true }));
    app.use(mongoSanitize());
    app.use("/videos", express.static(path.join(__dirname,"../../../../Public/videos")))
    app.use("/shorts", express.static(path.join(__dirname,"../../../../Public/shorts")))
    app.use("/saved", express.static(path.join(__dirname,"../../../../Public/saved")))
};

export default expressConfig;

 


