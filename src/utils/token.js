import jwt from 'jsonwebtoken';
import '../config/dotenv';

export const generateToken = (payload) => jwt.sign(
  payload,
  process.env.JWT_SECRET, { expiresIn: '1d' },
);
