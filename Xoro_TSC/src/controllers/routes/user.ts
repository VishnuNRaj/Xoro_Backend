import { Router } from 'express';
const userRouter: Router = Router()
import * as Middleware from '../middlewares/UserController'
import upload from '../other/Multer';
import TrimVideo from "../../frameworks/system/TrimVideo"

userRouter.post('/register', Middleware.Register)
userRouter.post('/login', Middleware.Login)
userRouter.get('/verify-account/:VerificationLink/:UserId', Middleware.VerifyAccount)
userRouter.post('/update-verify/:UserId', upload.single('Profile'), Middleware.AddProfile)
userRouter.post('/otp/:UserId', Middleware.OtpVerify)
userRouter.get('/verify', Middleware.VerifyUserAuth, Middleware.VerifyUserResponse)
userRouter.post('/resendotp/:UserId', Middleware.ResendOTP)
userRouter.post('/get-twostep', Middleware.VerifyUserAuth, Middleware.getSecurity)
userRouter.post('/set-twostep', Middleware.VerifyUserAuth, Middleware.setSecurity)
userRouter.post("/trim", Middleware.VerifyUserAuth, TrimVideo)
userRouter.get("/category/:search", Middleware.VerifyUserAuth, Middleware.getCategoryData)
userRouter.post("/subscribe", Middleware.VerifyUserAuth, Middleware.Subscribe)
userRouter.get("/getChannel", Middleware.VerifyUserAuth, Middleware.GetChannel)
userRouter.get("/msg/:skip", Middleware.VerifyUserAuth, Middleware.getNotification)

export default userRouter