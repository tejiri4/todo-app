/* eslint-disable no-underscore-dangle */
import { comparePassword, generateRandomPassword, hashPassword } from '../utils/password';
import User from '../db/models/user';
import { generateToken } from '../utils/token';
import BlacklistedToken from '../db/models/blacklistedToken';
import { publisher } from '../services/rabbitmq';

// register a new user
export const registerUser = async (req, res) => {
  try {
    const {
      password, email, name,
    } = req.body;

    if (req.user) {
      return res.status(400).json({
        message: 'Email already exist.',
      });
    }

    const hashedPassword = hashPassword(password);

    const user = await User.create({
      password: hashedPassword,
      email,
      name,
    });

    if (req.sendMail) {
      const html = `
      <h1>Welcome to Todo app</h1>
      <p>Your new password is ${password}</p>
    `;

      // publish to queue
      publisher({
        queueName: 'email',
        message: {
          to: email, subject: 'Welcome', text: '', html,
        },
      });
    }

    if (req.sendMail) {
      return res.status(200).json({
        message: 'Kindly check your mail to login.',
      });
    }

    const token = generateToken({ id: user._id });

    const { _id } = user._doc;

    return res.status(200).json({
      message: 'User registered.',
      data: {
        _id,
        name,
        email,
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// sign in an existing user
export const login = (req, res) => {
  try {
    const {
      password, email,
    } = req.body;

    if (!req.user) {
      return res.status(400).json({
        message: 'Invalid email or password.',
      });
    }

    const { _id, name } = req.user;

    const isPasswordCorrect = comparePassword(password, req.user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken({ id: _id });

    return res.status(200).json({
      message: 'Login successful.',
      data: {
        _id,
        name,
        email,
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// sign out a user
export const logout = async (req, res) => {
  try {
    await BlacklistedToken.create({ token: req.headers.token });

    return res.status(200).json({
      message: 'Logout was successful.',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  try {
    const {
      _id,
    } = req.user;

    await User.remove({ _id });

    return res.status(200).json({
      message: 'User deleted successfully.',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const {
      _id,
    } = req.user;

    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          message: 'User with email already exist.',
        });
      }
    }

    await User.updateOne({ _id }, { ...req.body });

    return res.status(200).json({
      message: 'User updated successfully.',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// get user details by token
export const returnAuthenticatedUser = async (req, res) => {
  try {
    // strip password
    const { password, ...rest } = req.user._doc;

    return res.status(200).json({
      message: 'User fetched successfully.',
      data: rest,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

// invite user
export const inviteUser = async (req, res) => {
  try {
    const password = generateRandomPassword();

    // set auto generated password
    req.body.password = password;

    // send email
    req.sendMail = true;

    return registerUser(req, res);
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export const getUsers = async (_, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      message: 'Users fetched successfully.',
      data: users.map(({ _doc: { password, ...rest } }) => rest),
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
