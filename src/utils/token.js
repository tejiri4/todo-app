import jwt from 'jsonwebtoken';
import '../config/dotenv';

export const generateToken = (payload) => jwt.sign(
  payload,
  process.env.JWT_SECRET, { expiresIn: '1d' },
);

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    return null;
  }
};
