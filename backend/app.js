require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const corsHeandler = require('./middlewares/cors');
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

app.use(corsHeandler);

app.use(requestLogger);

app.use('/', rootRoute);

app.use(errorLogger);

app.use(errors());

app.use(handlerError);

app.listen(config.PORT, () => {
  console.log(`Сервер запущен на ${config.PORT} порту`);
});
