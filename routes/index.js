const router = require("express").Router();
const moment = require('moment')

/* GET home page */
router.get("/", async (req, res, next) => {
  
  res.render("index");
});

module.exports = router;
