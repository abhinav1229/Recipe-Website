const mongoose = require("mongoose");

const RecipeImageSchema = new mongoose.Schema({
  userName: String,
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("images", RecipeImageSchema);
module.exports = Image;
