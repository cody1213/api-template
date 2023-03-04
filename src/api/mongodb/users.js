const models = require("../../databases/mongodb/models");
const User = models.User;

exports.list = function (req, res, next) {
  User.find({ archivedAt: null }).exec(function (err, results) {
    res.jsonData = results;
    next(err);
  });
};

exports.show = function (req, res, next) {
  User.findOne({
    archivedAt: null,
    _id: req.params.id,
  }).exec(function (err, results) {
    res.locals.users = results;
    next(err);
  });
};
