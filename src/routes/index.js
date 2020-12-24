import express from 'express';

// routers
import taskRouter from './v1/task';
import userRouter from './v1/user';

const appRouter = express.Router();

appRouter.use('/v1/user', userRouter);
appRouter.use('/v1/task', taskRouter);

export default appRouter;
