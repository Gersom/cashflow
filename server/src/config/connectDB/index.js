const DB_ENGINE = process.env.DB_ENGINE
let connectMongoDB = () => null

switch (DB_ENGINE) {
  case "mongodb":
    connectMongoDB = require("./mongodb")
    break
  default:
    throw new Error("Environment variable 'DB_ENGINE' is not valid.")
}

module.exports = { connectDB: connectMongoDB }