const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController")

router.use("/recipes",recipesController);

module.exports = router;
