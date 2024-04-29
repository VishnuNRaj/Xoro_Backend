import { Router } from 'express';
const profileRouter: Router = Router()
import * as Middleware from '../middlewares/UserController'
import * as Middleware2 from '../middlewares/UserController2'
import upload from '../other/Multer';
profileRouter.post('/edit-banner', upload.single('Image'), Middleware.VerifyUserAuth, Middleware2.EditBanner)
profileRouter.post('/edit-profile-pic', upload.single('Image'), Middleware.VerifyUserAuth, Middleware2.EditProfilePic)
profileRouter.post('/edit-profile', Middleware.VerifyUserAuth, Middleware2.EditProfile)
profileRouter.post('/secure-account', Middleware.VerifyUserAuth, Middleware2.SecureAccount)
profileRouter.post('/profile-settings', Middleware.VerifyUserAuth, Middleware2.ProfileSettings)
profileRouter.post('/follow/:UserId', Middleware.VerifyUserAuth, Middleware2.FollowUser)
profileRouter.post('/unfollow/:UserId', Middleware.VerifyUserAuth, Middleware2.UnFollowUser)

export default profileRouter;