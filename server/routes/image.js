const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const ImageModel = require("../Db/recipeimage");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/imageUpload", upload.single("testImage"), (req, res) => {
  const saveImage = new ImageModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });

  saveImage
    .save()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err, "error has occured");
      res.send("error to save");
    });
  // res.send(saveImage, "image is saved");
});

router.get("/default", (req, res) => {
  res.send("inside image router");
});

router.post("/getImage", async (req, res) => {
  let recipeImageId =  req.body.recipeImageId;
  ImageModel.find({
    _id:recipeImageId
  }, (err, result) => {
    if(err) res.send("ERROR");
    res.send(result);
  });
});

module.exports = router;
