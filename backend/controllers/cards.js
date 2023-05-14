const Card = require('../models/card');
const { CREATED } = require('../utils/err-name');

const ErrorNotFound = require('../errors/errorNotFound');
const ErrorForbidden = require('../errors/errorForbidden');
const ErrorBadRequest = require('../errors/errorBadRequest');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карточка не найдена');
      }
      if (card.owner.valueOf() === req.user._id) {
        Card.deleteOne({ _id: card._id })
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          })
          .catch(next);
      } else {
        throw new ErrorForbidden('Необходимо авторизоваться');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },

    { new: true },
  )
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new ErrorNotFound('Ошибка установки like');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new ErrorNotFound('Ошибка снятия like');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
