const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const config = require('../config');

const { CastError, ValidationError } = mongoose.Error;

const ErrorMongoose = require('../errors/errorMongoose');
const ErrorBadRequest = require('../errors/errorBadRequest');
const ErrorNotFound = require('../errors/errorNotFound');

const { CREATED } = require('../utils/err-name');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.NODE_ENV === 'production' ? config.JWT_SECRET : config.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      res.send({ message: 'Авторизация успешна' });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const response = user.toObject();
      delete response.password;
      res.status(CREATED).send({ data: response });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ErrorMongoose('Пользователь с таким email уже зарегистирован'));
      } else if (err instanceof ValidationError) {
        next(new ErrorBadRequest('Некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new ErrorNotFound('Пользователь не найден');
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new ErrorNotFound('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new ErrorBadRequest('Переданы не корректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new ErrorNotFound('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new ErrorBadRequest('Переданы не корректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorNotFound('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new ErrorBadRequest('Переданы не корректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateUserAvatar,
  login,
  getUserInfo,
  logout,
};
