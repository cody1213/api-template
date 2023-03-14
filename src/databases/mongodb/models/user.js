const mongoose = (exports.mongoose = require("mongoose"));
const Schema = mongoose.Schema;

module.exports = new Schema({
  created: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/,
    index: true,
  },
  token: { type: String },
});
