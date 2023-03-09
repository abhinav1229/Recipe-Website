const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const RecipeModel = require("../Db/newRecipe");

router.post("/addNewRecipe", async (req, res) => {
  let userName = req.body.userName;
  let fullName = req.body.fullName;
  let recipeName = req.body.recipeName;
  let recipeIngradients = req.body.recipeIngradients;
  let recipeDescription = req.body.recipeDescription;
  let recipeNote = req.body.recipeNote;
  let recipeImageId = req.body.recipeImageId;
  let recipeSaveTime = new Date().toJSON();

  console.log("backend: ", recipeImageId);


  const recipe = new RecipeModel({
    userName: userName,
    fullName: fullName,
    recipeName: recipeName,
    recipeIngradients: recipeIngradients,
    recipeDescription: recipeDescription,
    recipeNote: recipeNote,
    recipeImageId: recipeImageId,
    recipeSaveTime: recipeSaveTime,
  });

  try {
    await recipe.save();
    res.send("user saved...");
  } catch (e) {
    console.log("Error from database save...");
  }
});

router.get("/allRecipe", (req, res) => {
  RecipeModel.find({}, (err, result) => {
    res.send(result);
  });
});

router.post("/recipeFind", (req, res) => {
  let recipeName = req.body.search;

  RecipeModel.find({ recipeName: recipeName }, (err, result) => {
    res.send(result);
  });
});

router.post("/recipeFindById", (req, res) => {
  let recipeId = req.body.recipeId;

  RecipeModel.find({ _id: recipeId }, (err, result) => {
    res.send(result);
  });
});

router.post("/recipeFindByUserName", (req, res) => {
  let userName = req.body.userName;

  RecipeModel.find({ userName: userName }, (err, result) => {
    res.send(result);
  });
});

module.exports = router;
