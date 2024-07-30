require('dotenv').config();
require('module-alias/register');

const { connectDB } = require('@services/connectDB');
const insertData = require("@services/insertDB");
const createServer = require('@config/createServer');


async function startServer() {
  try {
    await connectDB();
    await insertData();
    createServer();
  } catch (err) {
    process.exit(1);
  }
}

startServer();
