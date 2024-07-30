import { Router } from "express";
import { VerifyUserAuth } from "../middlewares/UserController";
import * as Middlewares from "../middlewares/ShortsController"
import upload from "../other/Multer";
const shortsRouter:Router = Router()
shortsRouter.route("/upload").post(upload.single("Shorts"),VerifyUserAuth,Middlewares.uploadShorts)

export default shortsRouter
