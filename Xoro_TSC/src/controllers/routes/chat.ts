import {Router } from 'express'
const chatRouter: Router = Router()

chatRouter.route('/chat/:UserId')

export default chatRouter