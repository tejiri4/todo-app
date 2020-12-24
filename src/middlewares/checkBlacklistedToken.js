import BlacklistedToken from '../db/models/blacklistedToken';

const checkBlacklistedToken = (req, res, next) => {
  try {
    const blackListedToken = BlacklistedToken.findOne({ token: req.headers.token }).exec();

    if (blackListedToken) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }

    return next();
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export default checkBlacklistedToken;
