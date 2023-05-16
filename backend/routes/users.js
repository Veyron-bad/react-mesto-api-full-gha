const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegEx = require('../utils/urlRegEx');
const {
  getUsers, getUserById, updateProfile, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

routerUsers.get('/me', getUserInfo);
routerUsers.get('/:userId', celebrate({
  params: {
    userId: Joi.string().hex().length(24).required(),
  },
}), getUserById);
routerUsers.get('/', getUsers);

routerUsers.patch('/me', celebrate({
  body: {
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  },
}), updateProfile);
routerUsers.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required().pattern(urlRegEx),
  },
}), updateUserAvatar);

module.exports = routerUsers;
