const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const { serv } = require("@config/env.js");
const errorHandler = require('@middlewares/errorHandler.js');

const middlewares = (app) => {
  // CORS configuration
  app.use(cors({
    origin: serv.nodeEnv === 'production' ? serv.allowedOrigins : ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true 
  }));

  // Additional security
  app.use(helmet());

  if (serv.nodeEnv === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
  }

  // Cookie parser
  app.use(cookieParser());
  
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // Error handling
  app.use(errorHandler);
};

module.exports = middlewares;
