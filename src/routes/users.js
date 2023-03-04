const express = require("express");
const router = express.Router();
const utils = require("./utils");
const data = require("../api/mongodb/users");

/* GET users listing. */
router.get("/", utils.requireLogin, data.list, utils.sendJSON);
router.get("/:id", utils.requireLogin, data.show, utils.sendJSON);

module.exports = router;
