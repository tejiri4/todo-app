import { connectMongo, mockExpressResponse } from '..';
import { createTask, getTasks, getTask, completeTask, deleteTask } from '../../controllers/task';
import { registerUser } from '../../controllers/user';

jest.mock('nodemailer')

describe('TASK',()=>{
    let newUserId;
    let newTaskId;

    beforeAll(async () => {
      await connectMongo()

      const req = {
        body: {
          password:"password", email: "test2@gmail.com", name:"Test user 2"
        }
      }

      const { data: { _id }} = await registerUser(req, mockExpressResponse);

      newUserId = _id;
    })
  
    it('should create a new task', async (done) => {
      const req = {
        body: {
          userId: newUserId, description: "New task"
        }
      }

      const { data: { description, _id }} = await createTask(req, mockExpressResponse);

      newTaskId = _id;

      expect(description).toEqual('New task')
      done()
    })

    it('should retrieve all tasks', async (done) => {
      const tasks = await getTasks(null, mockExpressResponse);

      expect(tasks.data.length).toBeGreaterThanOrEqual(1)
      done()
    });

    it('should retrieve a single task', async (done) => {
      const req = {
        params: {
          id: newTaskId
        }
      }

      const { data } = await getTask(req, mockExpressResponse);

      expect(data.description).toEqual('New task')
      done()
    });


    it('should complete a task', async (done) => {
      const req = {
        params: {
          id: newTaskId
        }
      }

      const { message } = await completeTask(req, mockExpressResponse);

      expect(message).toEqual('Task was completed successfully')
      done()
    });

    it('should delete a task', async (done) => {
      const req = {
        params: {
          id: newTaskId
        }
      }

      const { message } = await deleteTask(req, mockExpressResponse);

      expect(message).toEqual('Task was deleted successfully')
      done()
    });
  })