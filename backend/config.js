require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 300,
  BASE_URL: process.env.BASE_URL || 'http://localhost',
  NODE_EVN: process.env.NODE_EVN || 'developer',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET: process.env.JWT_SECRET || 'super-strong-secret',
};
