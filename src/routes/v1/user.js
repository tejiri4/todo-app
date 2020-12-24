import express from 'express';
import {
  registerUser, login, logout, deleteUser, updateUser, inviteUser, getUserByToken,
} from '../../controllers/user';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.delete('/me', deleteUser);
userRouter.patch('/me', updateUser);
userRouter.post('/invite', inviteUser);
userRouter.get('/me', getUserByToken);

export default userRouter;
