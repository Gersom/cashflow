const requiredEnvVars = [
  'NODE_ENV',
  'HOST',
  'ALLOWED_ORIGINS',

  'DB_URI',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',

  'JWT_REFRESH_SECRET',
  'JWT_ACCESS_SECRET',
  'JWT_ACCESS_EXPIRES_IN',
  'JWT_REFRESH_EXPIRES_IN',
  'SALT_ROUNDS',
  'COOKIE_MAX_AGE',

  'MAILER_EMAIL',
  'MAILER_PASSWORD',
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `\n*** ERROR ***\nThe following environment variables are not configured in the .env file:\n${missingVars.join(', ')}\nMake sure that the .env file contains the necessary configuration.`
  );
}

const host = process.env.HOST;
const port = process.env.PORT;
const serv = {
  nodeEnv: process.env.NODE_ENV,
  host,
  port,
  address: port ? `${host}:${port}` : host,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
};

const db = {
  uri: process.env.DB_URI,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const jwt = {
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiration: process.env.REFRESH_JWT_EXPIRES_IN,
  secret: process.env.JWT_ACCESS_SECRET,
  expiration: process.env.JWT_ACCESS_EXPIRES_IN,
};

const checkInteger = require("@utils/checkInteger");
const auth = {
  saltRounds: checkInteger(process.env.SALT_ROUNDS),
  cookieMaxAge: checkInteger(process.env.COOKIE_MAX_AGE),
};

const mailer = {
  email: process.env.MAILER_EMAIL,
  password: process.env.MAILER_PASSWORD,
}

module.exports = { serv, db, jwt, mailer, auth };
