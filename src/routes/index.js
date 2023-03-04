const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "See docs at https://github.com/cody1213/api-template",
  });
});

module.exports = router;
