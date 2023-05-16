const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/errUnauthorized');
const config = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new ErrorUnauthorized('Необходимо авторизоваться'));
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, config.NODE_ENV === 'production' ? config.JWT_SECRET : config.JWT_SECRET);
  } catch (err) {
    return next(new ErrorUnauthorized('Необходимо авторизоваться'));
  }

  req.user = payload;

  return next();
};
