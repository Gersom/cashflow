const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const { serv } = require("@config/env.js");

const middlewares = (app) => {
  // CORS configuration
  const generateOrigin = () => {
    try {
      if (serv.isProduction) {
        return JSON.parse(serv.allowedProdOrigins.replace(";", ""));
      } else {
        return JSON.parse(serv.allowedDevOrigins.replace(";", ""));
      }
    } catch (error) {
      if (serv.isProduction) {
        return serv.allowedProdOrigins.replace(";", "");
      } else {
        return serv.allowedDevOrigins.replace(";", "");
      }
    }
  }

  const originResult = generateOrigin();

  const corsOptions = {
    origin: originResult,
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
