import { Router } from 'express';
import { VerifyUserAuth } from '../middlewares/UserController';
import * as Middleware from './../middlewares/PostController';
import upload from '../other/Multer';
const postRouter: Router = Router()
postRouter.get('/', VerifyUserAuth, Middleware.ShowPostImages)
postRouter.get('/:skip', VerifyUserAuth, Middleware.GetPosts)
postRouter.post('/add-post', upload.array('Media'),VerifyUserAuth, Middleware.PostImages)
postRouter.get('/delete/:PostId',VerifyUserAuth, Middleware.DeletePost)
postRouter.patch('/reactions/like/:PostId',VerifyUserAuth, Middleware.LikePost)
postRouter.patch('/reactions/dislike/:PostId',VerifyUserAuth, Middleware.DislikePost)
postRouter.patch('/reactions/remove/:PostId',VerifyUserAuth, Middleware.RemoveReactions)
postRouter.post('/report/:PostId',VerifyUserAuth, Middleware.RemoveReactions)
postRouter.get("/find/:postId",VerifyUserAuth, Middleware.GetPost)
postRouter.get("/random",VerifyUserAuth,Middleware.getRandomUsers)




export default postRouter