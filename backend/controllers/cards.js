const { default: mongoose } = require('mongoose');
const Card = require('../models/card');
const { CREATED } = require('../utils/err-name');

const ErrorNotFound = require('../errors/errorNotFound');
const ErrorForbidden = require('../errors/errorForbidden');
const ErrorBadRequest = require('../errors/errorBadRequest');

const { ValidationError, CastError } = mongoose.Error;

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
      if (err instanceof ValidationError) {
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
        card.deleteOne()
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

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карточка отсутствует');
      }
      return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
        .then((newCard) => newCard.populate(['owner', 'likes']))
        .then((newCard) => { res.send(newCard); });
    })
    .catch((err) => {
      if (err instanceof CastError ) {
        next(new ErrorNotFound('Карточка с несуществующим в БД id'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карточка отсутствует');
      }
      return Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
        .then((newCard) => newCard.populate(['owner', 'likes']))
        .then((newCard) => { res.send(newCard); });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new ErrorNotFound('Карточка с несуществующим в БД id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
