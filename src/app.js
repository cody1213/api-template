const NODE_ENV = process.env.NODE_ENV || "development";

const dotenv = require("dotenv");
const path = require("path");
const envFile = path.join(__dirname, "..", `.env.${NODE_ENV}`);
dotenv.config({ path: envFile });

const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const helmet = require("helmet");

var config = (global.config = require("./config"));
config.appRoot = path.resolve(__dirname);

const errorHandler = require("./middleware/errorHandler");

if (config.mongodb) {
  const db = require("./databases/mongodb/connect.js");
  config.db = db;
}

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  if (typeof res.jsonData === "undefined") {
    res.jsonData = {};
  }
  next();
});

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

module.exports = app;
