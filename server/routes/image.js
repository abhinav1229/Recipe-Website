const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const ImageModel = require("../Db/recipeimage");
const ProfileImageModel = require("../Db/profileimage");

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
  let fileName = req.file.filename;
  const saveImage = new ImageModel({
    img: {
      data: fs.readFileSync("uploads/" + fileName),
      contentType: "image/png",
    },
  });

  saveImage
    .save()
    .then((response) => {
      // this code will delete the file which you have uploaded from the server/uploads folder.
      // but do upload on the database.
      fs.unlink("uploads/" + fileName, (err) => {
        if (err) {
          throw err;
        }
        console.log("Delete File successfully.");
      });
      res.send(response);
    })
    .catch((err) => {
      console.log(err, "error has occured");
      res.send("error to save");
    });
});

router.post(
  "/profileImageUpload",
  upload.single("profileImage"),
  (req, res) => {
    ProfileImageModel.find({ userName: req.body.userName }, (err, result) => {
      if (err) res.send("ERROR");

      if (result.length) {
          result[0].img = {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png",
          };
          result[0].save().then((response) => {
            res.send(response);
          })
          .catch((err) => {
            console.log(err, "error has occured");
            res.send("error to save");
          });
      } else {
        const saveImage = new ProfileImageModel({
          userName: req.body.userName,
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
      }
    });
  }
);

router.post("/getImage", async (req, res) => {
  let recipeImageId = req.body.recipeImageId;
  ImageModel.find(
    {
      _id: recipeImageId,
    },
    (err, result) => {
      if (err) res.send("ERROR");
      res.send(result);
    }
  );
});

router.get("/profileImage", async (req, res) => {
  let userName = req.query.userName;
  ProfileImageModel.find(
    {
      userName: userName,
    },
    (err, result) => {
      if (err) res.send("ERROR");
      res.send(result);
    }
  );
});

router.put("/profileImageUserNameUpdate", async (req, res) => {
  let userName = req.body.userName;
  let newUserName = req.body.newUserName;

  console.log(userName, newUserName)

  try {
    let profileImageData = await ProfileImageModel.find({
      userName: userName,
    });
    profileImageData[0].userName = newUserName;
    profileImageData[0].save();
    res.send(profileImageData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
