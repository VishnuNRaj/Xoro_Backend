import { Router } from "express";
import { VerifyUserAuth } from "../middlewares/UserController";
import * as Middlewares from "../middlewares/ShortsController"
import upload from "../other/Multer";
const shortsRouter: Router = Router()
shortsRouter.route("/upload").post(upload.single("Shorts"), VerifyUserAuth, Middlewares.uploadShorts)
shortsRouter.put("/", VerifyUserAuth, Middlewares.getShorts)
shortsRouter.get("/:id", VerifyUserAuth, Middlewares.getShortsVideo)
shortsRouter.patch("/reactions/:type/:VideoId", VerifyUserAuth, Middlewares.LikeDislikeRemoveVideo)

export default shortsRouter
