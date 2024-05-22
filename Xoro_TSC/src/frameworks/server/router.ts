import { Application } from "express";
import userRouter from "../../controllers/routes/user";
import adminRouter from './../../controllers/routes/admin';
import postRouter from './../../controllers/routes/post';
import profileRouter from './../../controllers/routes/profile';
import searchRouter from './../../controllers/routes/search';
import videoRouter from './../../controllers/routes/video';
import chatRouter from './../../controllers/routes/chat';
import liveRouter from './../../controllers/routes/live';

const RouterConfig: Function = (app: Application) => {
    app.use('/user', userRouter)
    app.use('/admin', adminRouter)
    app.use('/post', postRouter)
    app.use('/profile', profileRouter)
    app.use('/search', searchRouter)
    app.use('/video', videoRouter)
    app.use('/chat', chatRouter)
    app.use('/live',liveRouter)
}



export default RouterConfig