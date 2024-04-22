import { Router } from 'express';
import { VerifyUserAuth } from '../middlewares/UserController';
import * as Middleware from './../middlewares/PostController';
const postRouter: Router = Router()
postRouter.get('/', VerifyUserAuth, Middleware.ShowPostImages)
postRouter.post('/add-post', VerifyUserAuth, Middleware.PostImages)

export default postRouter