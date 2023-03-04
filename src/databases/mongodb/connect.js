const mongoose = require("mongoose");
const config = require("../../config");

mongoose.set("strictQuery", false);

mongoose.connect(config.mongodb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

require("./models");

module.exports = db;
