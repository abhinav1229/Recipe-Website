const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
  recipeIngradients: {
    type: String,
    required: true,
  },
  recipeDescription: {
    type: String,
    required: false,
  },
  recipeNote: {
    type: String,
    required: false,
  },
  recipeSaveTime: {
    type: String,
    required: true,
  },
  recipeImageId: {
    type: String,
  }
});

const Recipe = mongoose.model("recipes", RecipeSchema);
module.exports = Recipe;
