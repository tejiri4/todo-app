import { connectMongo, mockExpressResponse } from '.';
import { deleteUser, inviteUser, login, logout, registerUser, returnAuthenticatedUser, updateUser } from '../controllers/user';
import User from '../db/models/user';

jest.mock('nodemailer')

describe('USER', ()=>{
    beforeAll(() => {
      connectMongo()
    })

    let userToken;
  
    it('should register a new user', async (done) => {
      const req = {
        body: {
          password:"password", email: "test@gmail.com", name:"Test user"
        }
      }

      const { data: { name, email, token }} = await registerUser(req, mockExpressResponse);

      userToken = token;

      expect(name).toEqual(req.body.name)
      expect(email).toEqual(req.body.email)
      expect(token.length).toBeGreaterThanOrEqual(1)
      done()
    })

    it('should invite a new user', async (done) => {
      const req = {
        body: {
          email: "test@gmail.com", name:"Test user"
        }
      }

      const { data: { name, email, token }} = await inviteUser(req, mockExpressResponse);

      userToken = token;

      expect(name).toEqual(req.body.name)
      expect(email).toEqual(req.body.email)
      expect(token.length).toBeGreaterThanOrEqual(1)
      done()
    })

    it('should allow created user login to the app', async (done) => {
      const req = {
        body: {
          password:"password", email: "test@gmail.com", name:"Test user"
        }
      }

      const existingUser = await User.findOne({ email: req.body.email })

      req.user = existingUser;

      const { data: { name, email, token }}  = await login(req, mockExpressResponse);

      expect(name).toEqual(req.body.name)
      expect(email).toEqual(req.body.email)
      expect(token.length).toBeGreaterThanOrEqual(1)
      done()
    })

    it('should return authenticated user', async (done) => {
      const req = {
        body: {
          email: "test@gmail.com", name:"Test user"
        }
      }

      const existingUser = await User.findOne({ email: req.body.email })

      req.user = existingUser;

      const { data: { name, email }}  = await returnAuthenticatedUser(req, mockExpressResponse);

      expect(name).toEqual(req.body.name)
      expect(email).toEqual(req.body.email)
      done()
    })

    it('should not update a user email if new email exists', async (done) => {
      const req = {
        body: {
          email: "test@gmail.com"
        },
        headers: {
          token: userToken
        }
      }

      const existingUser = await User.findOne({ email: req.body.email })

      req.user = existingUser;

      const { message } = await updateUser(req, mockExpressResponse);

      expect(message).toEqual("User with email already exist.")
      done()
    })

    it('should update a user email if new email dont exists', async (done) => {
      const req = {
        body: {
          email: "testmodified@gmail.com"
        },
      }

      const existingUser = await User.findOne({ email: "test@gmail.com" })

      req.user = existingUser;

      const { message } = await updateUser(req, mockExpressResponse);

      expect(message).toEqual("User updated successfully.")
      done()
    })

    it('should log out an existing user', async (done) => {
      const req = {
        headers: {
          token: userToken
        }
      }

      const { message } = await logout(req, mockExpressResponse);

      expect(message).toEqual("Logout was successful.")
      done()
    })

    it('should log out an existing user', async (done) => {
      const req = {
        headers: {
          token: userToken
        }
      }

      const { message } = await logout(req, mockExpressResponse);

      expect(message).toEqual("Logout was successful.")
      done()
    })

    it('should delte a user', async (done) => {
      const req = {
        headers: {
          token: userToken
        }
      }

      const existingUser = await User.findOne({ email: "testmodified@gmail.com" })

      req.user = existingUser;

      const { message } = await deleteUser(req, mockExpressResponse);

      expect(message).toEqual("User deleted successfully.")
      done()
    })
  })