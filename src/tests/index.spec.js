import { connectMongo, mockExpressResponse } from '.';
import { registerUser } from '../controllers/user';

describe('USER', ()=>{
    beforeAll(() => {
      connectMongo()
    })
  
    it('should register a new user', async (done) => {
      const req = {
        body: {
          password:"password", email: "test@gmail.com", name:"Test user"
        }
      }

      const { data: { name, email }} = await registerUser(req, mockExpressResponse);

      expect(name).toEqual(req.body.name)
      expect(email).toEqual(req.body.email)
      done()
    })
  })