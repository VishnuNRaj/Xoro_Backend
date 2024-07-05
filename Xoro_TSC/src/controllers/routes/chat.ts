import { Router } from 'express'
const chatRouter: Router = Router()
import Middlewares from "../middlewares/ChatController"
import ChatController from "../../entities/ControllersInterface/Chat"
import Usecases from "../../applications/usecases/Chat"
const Usecase = new Usecases()
const Middleware: ChatController = Middlewares(Usecase)
import { VerifyUserAuth } from '../middlewares/UserController'
chatRouter.route('/').get(VerifyUserAuth, Middleware.getChats).post(VerifyUserAuth, Middleware.StartChat)
chatRouter.get("/:RoomId",VerifyUserAuth ,Middleware.getChat)
export default chatRouter