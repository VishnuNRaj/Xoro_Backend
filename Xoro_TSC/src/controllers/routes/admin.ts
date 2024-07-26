import { Router } from 'express';
import * as Middleware from '../middlewares/AdminController';
const adminRouter: Router = Router()

adminRouter.post('/login', Middleware.AdminLogin)
adminRouter.post('/otp/:UserId', Middleware.AdminVerifyOTP);
adminRouter.post('/resendotp/:UserId', Middleware.ResendOTP)
adminRouter.get('/verify', Middleware.VerifyAdminAuth, Middleware.verifyAccountResponse)
adminRouter.get('/get-userdata', Middleware.VerifyAdminAuth, Middleware.getUsers)
adminRouter.post('/:UserId/manageUser', Middleware.VerifyAdminAuth, Middleware.ManageUsers)
adminRouter.route("/category/:CategoryId").all(Middleware.VerifyAdminAuth).put(Middleware.addCategory).delete(Middleware.deleteCategory).patch(Middleware.editCategory)
adminRouter.get("/category/:skip/:search", Middleware.VerifyAdminAuth, Middleware.getategory)
export default adminRouter;