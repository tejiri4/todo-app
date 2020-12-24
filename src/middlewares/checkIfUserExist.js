import User from '../db/models/user';

const checkIfUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).exec();

    if (user) {
      req.user = {
        ...user._doc,
      };
    }

    return next();
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export default checkIfUserExists;
