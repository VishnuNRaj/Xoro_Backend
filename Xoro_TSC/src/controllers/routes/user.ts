import { Router } from 'express';
const userRouter: Router = Router()
import * as Middleware from '../middlewares/UserController'
import upload from '../other/Multer';

userRouter.post('/register', Middleware.Register)
userRouter.post('/login', Middleware.Login)
userRouter.get('/verify-account/:VerificationLink/:UserId', Middleware.VerifyAccount)
userRouter.post('/update-verify/:UserId', upload.single('Profile'), Middleware.AddProfile)
userRouter.post('/otp/:UserId', Middleware.OtpVerify)
userRouter.get('/verify', Middleware.VerifyUserAuth, Middleware.VerifyUserResponse)
userRouter.post('/resendotp/:UserId', Middleware.ResendOTP)
export default userRouter