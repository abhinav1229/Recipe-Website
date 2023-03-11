const mongoose = require("mongoose");

const RecipeImageSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("images", RecipeImageSchema);
module.exports = Image;
