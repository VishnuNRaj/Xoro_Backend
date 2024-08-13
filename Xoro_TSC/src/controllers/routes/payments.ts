import { Router } from "express";
const paymentRouter: Router = Router()
import { VerifyUserAuth } from "../middlewares/UserController"
import * as Middleware from "../middlewares/PaymentController"

paymentRouter.route("/premium/:Type").all(VerifyUserAuth).post(Middleware.Premium)
paymentRouter.route("/join/:ChannelId").all(VerifyUserAuth).post(Middleware.JoinNow)
paymentRouter.route("/superchat/:LiveId").all(VerifyUserAuth).post(Middleware.SuperChat)



export default paymentRouter;