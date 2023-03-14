const models = require("../../databases/mongodb/models");
const User = models.User;
const config = require("../../config");
var jwt = require("jwt-simple");

const mysql = require("mysql");

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const pass = process.env.MYSQL_PASS;
const db = process.env.MYSQL_DB;

exports.queries = async function (query, callback) {
  let results, connection;
  try {
    connection = await mysql.createConnection({
      host: host,
      user: user,
      password: pass,
      database: db,
    });
  } catch (err) {
    console.log(err);
  }

  const rows = await connection.query({
    sql: query,
    rowsAsArray: true,
  });
  results = {
    query: query,
    results: rows,
  };
  connection.end();
  callback(null, results);
};

exports.authenticate = function (req, res, next) {
  const email = req.get("X-User");
  const key = req.get("X-Key");
  if (email && key) {
    User.findOne({
      token: key,
      email: email,
      archivedAt: null,
    })
      .then(function (err, results) {
        if (results) {
          let token = jwt.encode(
            {
              email: email,
              key: key,
            },
            config.secret
          );
          res.jsonData = {
            success: true,
            token: token,
          };
          next(err);
        } else {
          res.sendStatus(403);
        }
      })
      .catch(function (err) {
        res.sendStatus(403);
        console.error(err);
      });
  } else {
    res.sendStatus(403);
  }
};

exports.verify = function (req, res, next) {
  const bearerHeader = req.get("authorization");
  const token = bearerHeader.split(" ")[1];
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    if (decoded && decoded.key && decoded.email) {
      User.findOne({
        token: decoded.key,
        email: decoded.email,
        archivedAt: null,
      }).then(function (err, results) {
        if (results) {
          next(err, { user: results });
        } else {
          res.sendStatus(403);
        }
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
