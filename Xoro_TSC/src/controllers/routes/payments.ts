import { Router } from "express";
const paymentRouter: Router = Router()
import { VerifyUserAuth } from "../middlewares/UserController"

paymentRouter.route("/join").all(VerifyUserAuth).post()


export default paymentRouter;