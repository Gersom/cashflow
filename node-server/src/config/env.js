const checkInteger = require("@utils/checkInteger");

const ENV_VARS = {
  // serv
  NODE_ENV: 'NODE_ENV',
  HOST: 'HOST',
  PORT: 'PORT',
  ALLOWED_ORIGINS: 'ALLOWED_ORIGINS',
  CLIENT_URL: 'CLIENT_URL',

  // db
  DB_URI: 'DB_URI',
  DB_NAME: 'DB_NAME',
  DB_USER: 'DB_USER',
  DB_PASSWORD: 'DB_PASSWORD',

  // jwt
  JWT_ACCESS_EXPIRES_IN: 'JWT_ACCESS_EXPIRES_IN',
  JWT_ACCESS_SECRET: 'JWT_ACCESS_SECRET',
  JWT_EMAIL_EXPIRES_IN: 'JWT_EMAIL_EXPIRES_IN',
  JWT_EMAIL_SECRET: 'JWT_EMAIL_SECRET',
  JWT_REFRESH_EXPIRES_IN: 'JWT_REFRESH_EXPIRES_IN',
  JWT_REFRESH_SECRET: 'JWT_REFRESH_SECRET',

  // auth
  SALT_ROUNDS: 'SALT_ROUNDS',
  COOKIE_MAX_AGE: 'COOKIE_MAX_AGE',
  RECOVER_CODE_EXPIRES_IN: 'RECOVER_CODE_EXPIRES_IN',

  // mailer
  MAILER_EMAIL: 'MAILER_EMAIL',
  MAILER_PASSWORD: 'MAILER_PASSWORD',
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
  isProduction: this.nodeEnv === 'production',
  isDevelopment: this.nodeEnv === 'development',
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
  emailExpiration: getEnvVar('JWT_EMAIL_EXPIRES_IN'),
  emailSecret: getEnvVar('JWT_EMAIL_SECRET'),
  expiration: getEnvVar('JWT_ACCESS_EXPIRES_IN'),
  refreshExpiration: getEnvVar('JWT_REFRESH_EXPIRES_IN'),
  refreshSecret: getEnvVar('JWT_REFRESH_SECRET'),
  secret: getEnvVar('JWT_ACCESS_SECRET'),
};


const auth = {
  get saltRounds() {
    return checkInteger(getEnvVar('SALT_ROUNDS'));
  },
  get cookieMaxAge() {
    return checkInteger(getEnvVar('COOKIE_MAX_AGE'));
  },
  get codeExpiration() {
    return checkInteger(getEnvVar('RECOVER_CODE_EXPIRES_IN'));
  },
};

const mailer = {
  email: getEnvVar('MAILER_EMAIL'),
  password: getEnvVar('MAILER_PASSWORD'),
};

module.exports = { 
  initEnv,
  serv, db, jwt, mailer, auth, client
};