import { Router } from 'express';
import * as Middleware from '../middlewares/AdminController';
const adminRouter: Router = Router()

adminRouter.post('/login', Middleware.AdminLogin)
adminRouter.post('/otp/:UserId', Middleware.AdminVerifyOTP);
adminRouter.post('/resendotp', Middleware.ResendOTP)
adminRouter.get('/verify', Middleware.VerifyAdminAuth, Middleware.verifyAccountResponse)
adminRouter.get('/get-userdata',Middleware.VerifyAdminAuth,Middleware.getUsers)
adminRouter.post('/:UserId/manageUser',Middleware.VerifyAdminAuth,Middleware.ManageUsers)
adminRouter.route("/category").get().put().delete().patch()

export default adminRouter;