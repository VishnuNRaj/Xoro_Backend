import { Router } from 'express';
import { VerifyUserAuth } from '../middlewares/UserController';
import * as Middleware from './../middlewares/PostController';
import upload from '../other/Multer';
const postRouter: Router = Router()
postRouter.get('/', VerifyUserAuth, Middleware.ShowPostImages)
postRouter.post('/add-post', upload.array('Media'),VerifyUserAuth, Middleware.PostImages)
postRouter.get('/delete/:PostId',VerifyUserAuth, Middleware.DeletePost)


export default postRouter