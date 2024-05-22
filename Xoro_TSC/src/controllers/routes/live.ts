import {Router} from 'express';
const liveRouter:Router = Router();
import { VerifyUserAuth } from '../middlewares/UserController';
import * as Middleware from './../middlewares/PostController';
import upload from '../other/Multer';
// import webSocket from '../../frameworks/server/websocket';


liveRouter.get('/start-live',(req,res) => {
    // webSocket()
    res.status(200).json({message:'Socket Started Successfully'}) 
}) 

export default liveRouter;