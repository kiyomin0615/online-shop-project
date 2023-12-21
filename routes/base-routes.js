const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/all-products")
});

module.exports = router;
