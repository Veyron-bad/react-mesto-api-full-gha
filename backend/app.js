require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const allowedList = ['http://localhost:3000', 'https://veyronbad.danilovichiv.nomoredomains.monster', 'http://veyronbad.danilovichiv.nomoredomains.monster'];

const corsOptions = {
  origin(origin, callback) {
    if (allowedList.indexOf(origin) !== -1) {
      callback(null, true);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const config = require('./config');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const handlerError = require('./middlewares/handlerError');
const rootRoute = require('./routes/index');

const app = express();

app.use(cookieParser());

app.use(express.json());

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(cors(corsOptions));

app.use('/', rootRoute);

app.use(errorLogger);

app.use(errors());

app.use(handlerError);

app.listen(config.PORT, () => {
  console.log(`Сервер запущен на ${config.PORT} порту`);
});
