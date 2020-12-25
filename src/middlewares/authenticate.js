import User from '../db/models/user';
import { verifyToken } from '../utils/token';

const authenticate = async (req, res, next) => {
  try {
    const decoded = verifyToken(req.headers.token);
    const user = await User.findOne({ _id: decoded.id }).exec();

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized.',
    });
  }
};

export default authenticate;
