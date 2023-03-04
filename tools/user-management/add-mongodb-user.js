const NODE_ENV = process.env.NODE_ENV || "development";

// get environment variables
const dotenv = require("dotenv");
const path = require("path");
const envFile = path.join(__dirname, "..", "..", `.env.${NODE_ENV}`);
dotenv.config({ path: envFile });

const config = (global.config = require("../../src/config"));
config.appRoot = path.resolve(__dirname);

// import libraries
const { randomBytes } = require("node:crypto");
const buf = randomBytes(40);
const token = buf.toString("hex");

// import database models
const db = require("../../src/databases/mongodb/connect.js");
config.db = db;
const models = require("../../src/databases/mongodb/models");
const User = models.User;

let userData = {
  email: "test@example.com",
  token: token,
};

User.findOne({
  email: userData.email,
  archivedAt: null,
}).exec(function (err, results) {
  if (!results) {
    const admin = new User(userData);

    admin.save(function (err) {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log("Admin user created");
        process.exit();
      }
    });
  } else {
    console.log(userData.displayName + ", " + userData.email + " user already exists");
    process.exit(1);
  }
});
