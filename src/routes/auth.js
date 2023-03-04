const express = require("express");
const router = express.Router();
const auth = require("../api/mongodb/auth");
const utils = require("./utils");

router.get("/authenticate", auth.authenticate, utils.sendJSON);
router.post("/authenticate", auth.authenticate, utils.sendJSON);

module.exports = router;
