import express from 'express';
import {
  registerUser, login, logout, deleteUser, updateUser,
} from '../../controllers/user';
import authenticate from '../../middlewares/authenticate';
import checkBlacklistedToken from '../../middlewares/checkBlacklistedToken';
import checkIfUserExists from '../../middlewares/checkIfUserExist';
import validate from '../../validations';
import { userRegisterSchema, userLoginSchema, userUpdateSchema } from '../../validations/schema';

const userRouter = express.Router();

userRouter.post('/register', checkIfUserExists, validate(userRegisterSchema), registerUser);
userRouter.post('/login', checkIfUserExists, validate(userLoginSchema), login);
userRouter.post('/logout', logout);
userRouter.delete('/me', checkBlacklistedToken, authenticate, deleteUser);
userRouter.patch('/me', checkBlacklistedToken, authenticate, validate(userUpdateSchema), updateUser);

export default userRouter;
