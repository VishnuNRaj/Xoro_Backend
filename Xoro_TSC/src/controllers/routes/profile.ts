import { Router } from 'express';
const profileRouter: Router = Router()
import { VerifyUserAuth } from '../middlewares/UserController'
import * as Middleware from '../middlewares/ProfileController'
import upload from '../other/Multer';
profileRouter.post('/edit-banner', upload.single('Image'), VerifyUserAuth, Middleware.EditBanner)
profileRouter.post('/edit-profile-pic', upload.single('Image'), VerifyUserAuth, Middleware.EditProfilePic)
profileRouter.post('/edit-profile', VerifyUserAuth, Middleware.EditProfile)
profileRouter.post('/secure-account', VerifyUserAuth, Middleware.SecureAccount)
profileRouter.post('/profile-settings', VerifyUserAuth, Middleware.ProfileSettings)
profileRouter.post('/follow/:UserId', VerifyUserAuth, Middleware.FollowUser)
profileRouter.post('/remove/:UserId', VerifyUserAuth, Middleware.RemoveFollowUser)
profileRouter.post('/unfollow/:UserId', VerifyUserAuth, Middleware.UnFollowUser)
profileRouter.get('/search/:Search', VerifyUserAuth, Middleware.SearchUser)
profileRouter.post('/createChannel', upload.single('Logo'), VerifyUserAuth, Middleware.CreateChannel)
profileRouter.post("/edit-channel", upload.single('Logo'), VerifyUserAuth, Middleware.editChannel)
profileRouter.get("/channel", VerifyUserAuth, Middleware.getChannel)
profileRouter.get("/channel/:channelId", VerifyUserAuth, Middleware.getChannel)
profileRouter.get('/:ProfileLink', VerifyUserAuth, Middleware.GetProfile)
export default profileRouter;