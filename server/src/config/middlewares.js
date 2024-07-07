// const cors = require("cors")
const express = require("express");
const morgan = require("morgan");

// MIDDLEWARES
const middlewares = (app) => {
  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
  });
  // app.use(cors())

  app.use(morgan("dev"));
  app.use(express.json());
};

module.exports = middlewares;
