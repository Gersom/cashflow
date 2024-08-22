const requiredEnvVars = [
  'NODE_ENV',
  'HOST',
  'ALLOWED_ORIGINS',

  'DB_URI',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',

  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'SALT_ROUNDS',
  'COOKIE_MAX_AGE',
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
  secret: process.env.JWT_SECRET,
  expiration: process.env.JWT_EXPIRES_IN,
};

module.exports = { serv, db, jwt };
