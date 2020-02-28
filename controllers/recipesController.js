const express = require("express");
const router = express.Router();
const recipeService = require("../models/recipe");

router.get("/", async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    console.log("TCL: recipes", recipes);
    res.send({ message: "found all recipes", results: recipes });
  } catch (error) {
    console.log("TCL: error", error);
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const newRecipe = {
      name: req.body.name
  };
  //   console.log(newRecipe);
  try {
    const recipe = await recipeService.createRecipe(newRecipe);
    console.log("TCL: recipe", recipe);
    res.send({ message: "Succesfully added Recipe", results: recipe });
  } catch (error) {
    console.log("TCL: error", error);
    res.send(error);
  }
});

module.exports = router;
