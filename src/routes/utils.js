const auth = require("../api/mongodb/auth");

const sendJSON = function (req, res) {
  res.send(res.jsonData);
};

const requireLogin = function (req, res, next) {
  console.log(JSON.stringify(req.header));
  auth.verify(req, res, function (err, results) {
    if (results.user) {
      next(err);
    } else {
      res.sendStatus(403);
    }
  });
};

module.exports = {
  sendJSON: sendJSON,
  requireLogin: requireLogin,
};
