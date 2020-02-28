const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    
  });
  const Recipe = mongoose.model("recipe", RecipeSchema);

      const getAllRecipes = () => {
        return Recipe.find({});
      };

      const createRecipe = (newRecipe) =>{
          return Recipe.create(newRecipe)
       
      }

      module.exports = {
        getAllRecipes,
        createRecipe 
      }