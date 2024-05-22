import { Router } from 'express'
const videoRouter: Router = Router()
import * as Middleware from '../middlewares/VideoController'
import upload from '../other/Multer'
import { VerifyUserAuth } from '../middlewares/UserController'

videoRouter.post('/upload', upload.single('Video'), VerifyUserAuth, Middleware.uploadVideo)
export default videoRouter