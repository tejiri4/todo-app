import express from 'express';
import userRouter from './v1/user';

const appRouter = express.Router();

appRouter.use('/v1/user', userRouter);

export default appRouter;
