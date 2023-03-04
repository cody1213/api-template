const NODE_ENV = process.env.NODE_ENV || "development";

const dotenv = require("dotenv");
const path = require("path");
const envFile = path.join(__dirname, "..", `.env.${NODE_ENV}`);
dotenv.config({ path: envFile });

let siteConfig = {
  secret: "YOUR SECRET PHRASE HERE",
  mongodb: process.env.MONGODB_STRING,
};

module.exports = siteConfig;
