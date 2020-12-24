import express from 'express';
import {
  createTask, deleteTask, getTask, getTasks, completeTask,
} from '../../controllers/task';
import authenticate from '../../middlewares/authenticate';
import checkBlacklistedToken from '../../middlewares/checkBlacklistedToken';
import { idSchema, taskSchema } from '../../validations/schema';
import validate from '../../validations';

const taskRouter = express.Router();

taskRouter.post('/', checkBlacklistedToken, authenticate, validate(taskSchema), createTask);
taskRouter.get('/', checkBlacklistedToken, authenticate, getTasks);
taskRouter.get('/:id', checkBlacklistedToken, authenticate, validate(idSchema), getTask);
taskRouter.delete('/:id', checkBlacklistedToken, authenticate, validate(idSchema), deleteTask);
taskRouter.patch('/complete/:id', checkBlacklistedToken, authenticate, validate(idSchema), completeTask);

export default taskRouter;
