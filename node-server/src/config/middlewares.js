const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const { serv } = require("@config/env.js");

const middlewares = (app) => {
  // CORS configuration
  const corsOptions = {
    origin: serv.isProduction ? serv.allowedProdOrigins.split(',') : serv.allowedDevOrigins.split(','),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true 
  }
  
  if (serv.isDevelopment) console.log('CORS options:', corsOptions);

  app.use(cors(corsOptions));

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
};

module.exports = middlewares;
