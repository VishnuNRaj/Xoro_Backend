import { Router } from "express";
import * as Middleware from "../middlewares/CommentController"
import { VerifyUserAuth } from "../middlewares/UserController";
const commentRouter:Router = Router()
commentRouter.route("/:PostId").post(VerifyUserAuth,Middleware.AddComment).get(VerifyUserAuth,Middleware.getComments)

export default commentRouter