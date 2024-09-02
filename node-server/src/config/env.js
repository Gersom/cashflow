const checkInteger = require("@utils/checkInteger");

const ENV_VARS = {
  NODE_ENV: 'NODE_ENV',
  HOST: 'HOST',
  PORT: 'PORT',
  ALLOWED_ORIGINS: 'ALLOWED_ORIGINS',
  DB_URI: 'DB_URI',
  DB_NAME: 'DB_NAME',
  DB_USER: 'DB_USER',
  DB_PASSWORD: 'DB_PASSWORD',
  JWT_REFRESH_SECRET: 'JWT_REFRESH_SECRET',
  JWT_ACCESS_SECRET: 'JWT_ACCESS_SECRET',
  JWT_ACCESS_EXPIRES_IN: 'JWT_ACCESS_EXPIRES_IN',
  JWT_REFRESH_EXPIRES_IN: 'JWT_REFRESH_EXPIRES_IN',
  SALT_ROUNDS: 'SALT_ROUNDS',
  COOKIE_MAX_AGE: 'COOKIE_MAX_AGE',
  MAILER_EMAIL: 'MAILER_EMAIL',
  MAILER_PASSWORD: 'MAILER_PASSWORD',
  CLIENT_URL: 'CLIENT_URL',
};


const initEnv = () => {
  const missingVars = Object.values(ENV_VARS).filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `\n*** ERROR ***\nThe following environment variables are not configured in the .env file:\n\n${missingVars.join('\n')}\n\nPlease ensure that the .env file contains the necessary configuration.`
    );
  }
};

const getEnvVar = (key) => {
  const value = process.env[ENV_VARS[key]];
  // if (value === undefined) {
  //   throw new Error(`Environment variable ${ENV_VARS[key]} is not configured.`);
  // }
  return value;
};

const client = {
  url: getEnvVar('CLIENT_URL'),
};

const serv = {
  nodeEnv: getEnvVar('NODE_ENV'),
  host: getEnvVar('HOST'),
  port: getEnvVar('PORT'),
  get address() {
    return this.port ? `${this.host}:${this.port}` : this.host;
  },
  allowedOrigins: getEnvVar('ALLOWED_ORIGINS'),
};

const db = {
  uri: getEnvVar('DB_URI'),
  name: getEnvVar('DB_NAME'),
  user: getEnvVar('DB_USER'),
  password: getEnvVar('DB_PASSWORD'),
};

const jwt = {
  refreshSecret: getEnvVar('JWT_REFRESH_SECRET'),
  refreshExpiration: getEnvVar('JWT_REFRESH_EXPIRES_IN'),
  secret: getEnvVar('JWT_ACCESS_SECRET'),
  expiration: getEnvVar('JWT_ACCESS_EXPIRES_IN'),
};

const auth = {
  saltRounds: checkInteger(getEnvVar('SALT_ROUNDS')),
  cookieMaxAge: checkInteger(getEnvVar('COOKIE_MAX_AGE')),
};

const mailer = {
  email: getEnvVar('MAILER_EMAIL'),
  password: getEnvVar('MAILER_PASSWORD'),
};

module.exports = { 
  initEnv,
  serv, db, jwt, mailer, auth, client
};