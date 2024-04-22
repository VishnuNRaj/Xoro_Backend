import { Application } from "express";
import userRouter from "../../controllers/routes/user";
import adminRouter from './../../controllers/routes/admin';
import postRouter from './../../controllers/routes/post';

const RouterConfig: Function = (app: Application) => {
    app.use('/user',userRouter)
    app.use('/admin',adminRouter)
    app.use('/post',postRouter)
} 



export default RouterConfig