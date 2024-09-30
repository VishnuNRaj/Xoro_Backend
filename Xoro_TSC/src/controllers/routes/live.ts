import { Router } from 'express';
const liveRouter: Router = Router();
import { VerifyUserAuth } from '../middlewares/UserController';
import * as Middleware from './../middlewares/LiveController';
import upload from '../other/Multer';
liveRouter.post("/create", upload.single("Thumbnail"), VerifyUserAuth, Middleware.createLive)
liveRouter.post('/:category', VerifyUserAuth, Middleware.getLiveVideoFilter)
liveRouter.post('/', VerifyUserAuth, Middleware.getLiveVideoFilter)
liveRouter.get("/stream/:key", VerifyUserAuth, Middleware.getLivevideo)
liveRouter.patch('/reactions/:type/:VideoId',VerifyUserAuth,Middleware.LikeDislikeRemoveVideo)

export default liveRouter;