import express from 'express';
import {
  registerUser, login, logout, deleteUser, updateUser, inviteUser, getUserByToken,
} from '../../controllers/user';
import checkBlacklistedToken from '../../middlewares/checkBlacklistedToken';
import checkIfUserExists from '../../middlewares/checkIfUserExist';

const userRouter = express.Router();

userRouter.post('/register', checkIfUserExists, registerUser);
userRouter.post('/login', checkIfUserExists, login);
userRouter.post('/logout', logout);
userRouter.delete('/me', checkBlacklistedToken, checkIfUserExists, deleteUser);
userRouter.patch('/me', checkBlacklistedToken, updateUser);

export default userRouter;
