const express = require("express");
const mongoose = require("mongoose");
require("./Db/config");
const cors = require("cors");
const app = express();

const multer = require("multer");
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user");
const optRouter = require("./routes/forgot");
const recipeRouter = require("./routes/recipe");
const ratingRouter = require("./routes/rating");
const imageRouter = require("./routes/image");
const contactRouter = require("./routes/contact");
const profileRouter = require("./routes/profile");

app.use("/user", userRouter);
app.use("/forgot", optRouter);
app.use("/recipe", recipeRouter);
app.use("/rating", ratingRouter);
app.use("/image", imageRouter);
app.use("/contact", contactRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  res.send("Hello Developer!");
});

app.listen(3002, () => {
  console.log("Port is listeing at 3002");
});
