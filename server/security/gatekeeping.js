const { User } = require('../db');

const requireToken = async (req, res, next) => {
  console.log('test');
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    console.log(user);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin()) {
    return res.status(403).send('You do not have Admin privilege');
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
