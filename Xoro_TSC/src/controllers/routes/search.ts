import { Router } from 'express';
const searchRouter: Router = Router()
import {VerifyUserAuth} from '../middlewares/UserController'
import * as Middleware from '../middlewares/SearchController'

searchRouter.get("/:search",VerifyUserAuth,Middleware.searchData)

export default searchRouter