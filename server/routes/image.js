const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ImageModel = require("../Db/recipeimage");
const ProfileImageModel = require("../Db/profileimage");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only JPG, JPEG, and PNG files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/imageUpload", upload.single("testImage"), (req, res) => {
  const fileName = req.file.filename;
  const userName = req.body.userName;

  console.log(req.file);

  const extension = path.extname(fileName);

  const contentType = (() => {
    switch (extension) {
      case ".jpg":
      case ".jpeg":
        return "image/jpeg";
      case ".png":
        return "image/png";
      default:
        return "application/octet-stream";
    }
  })();

  const saveImage = new ImageModel({
    img: {
      data: fs.readFileSync("./uploads/" + fileName),
      contentType: contentType,
    },
  });

  saveImage
    .save()
    .then((response) => {
      // this code will delete the file which you have uploaded from the server/uploads folder.
      // but do upload on the database.
      fs.unlink("./uploads/" + fileName, (err) => {
        if (err) {
          throw err;
        }
      });
      res.send("OK");
    })
    .catch((err) => {
      res.send("error to save");
    });
});

router.post(
  "/profileImageUpload",
  upload.single("profileImage"),
  (req, res) => {
    let fileName = req.file.filename;

    ProfileImageModel.find({ userName: req.body.userName }, (err, result) => {
      if (err) res.send("ERROR");

      if (result.length) {
        result[0].img = {
          data: fs.readFileSync("uploads/" + fileName),
          contentType: "image/png",
        };
        result[0]
          .save()
          .then((response) => {
            fs.unlink("uploads/" + fileName, (err) => {
              if (err) {
                res.send("Error to update new image...");
              }
            });
            res.send(response);
          })
          .catch((err) => {
            res.send("error to save");
          });
      } else {
        const saveImage = new ProfileImageModel({
          userName: req.body.userName,
          img: {
            data: fs.readFileSync("uploads/" + fileName),
            contentType: "image/png",
          },
        });

        saveImage
          .save()
          .then((response) => {
            fs.unlink("uploads/" + fileName, (err) => {
              if (err) {
                res.send("error to save the new image");
              }
            });
            res.send(response);
          })
          .catch((err) => {
            res.send("error to save");
          });
      }
    });
  }
);

router.get("/getImage", async (req, res) => {
  let recipeImageId = req.query.recipeImageId;
  if(recipeImageId) {
    let result = await ImageModel.find({
      _id: recipeImageId,
    });

    try{
      res.send(result);
    } catch(e) {
      res.send(e);
    }
  } else {
    res.send('EMPTY');
  }
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

  try {
    let profileImageData = await ProfileImageModel.find({
      userName: userName,
    });
    if (profileImageData.length) {
      profileImageData[0].userName = newUserName;
      profileImageData[0].save();
    }
    res.send(profileImageData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;