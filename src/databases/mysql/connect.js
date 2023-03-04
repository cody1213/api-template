/*

This is not complete yet.

*/

const mysql = require("mysql");
// const promisify = require('util').promisify;

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const pass = process.env.MYSQL_PASS;
// const db = process.env.MYSQL_DB;

exports.queries = async function (query, callback) {
  let results, connection;
  try {
    connection = await mysql.createConnection({
      host: host,
      user: user,
      password: pass,
      database: "test",
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
