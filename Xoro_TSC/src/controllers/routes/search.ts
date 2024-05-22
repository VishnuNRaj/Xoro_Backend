import { Router } from 'express';
const searchRouter: Router = Router()
import {VerifyUserAuth} from '../middlewares/UserController'
import * as Middleware from '../middlewares/SearchController'

export default searchRouter