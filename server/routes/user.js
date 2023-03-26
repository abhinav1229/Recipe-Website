const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserModel = require("../Db/user");
const ProfileModel = require("../Db/profile");

router.post("/register", async (req, res) => {
  const fullName = req.body.fullName;
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const user = new UserModel({
    fullName: fullName,
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
    userOtp: "",
  });

  const profile = new ProfileModel({
    userName: userName,
    fullName: fullName,
    userBio: "",
    userSocialLinks: ["", "", ""],
    profileImageId: "",
  });

  try {
    let userSaveResult = await user.save();
    await profile.save();
    res.send(userSaveResult._id);
  } catch (e) {
    console.log(e);
  }
});

router.post("/registerValidate", async (req, res) => {
  let userName = req.body.userName;
  let userEmail = req.body.userEmail;

  UserModel.find({ userName: userName }, (err, result) => {
    if (result.length === 0) {
      UserModel.find({ userEmail: userEmail }, (err, result) => {

        if(err) res.status(500).send("error");

        if (result.length === 0) {
          res.status(200).send("valid");
        } else {
          res.status(200).send("email");
        }
      });
    } else {
      res.status(200).send("username");
    }
  });
});

router.post("/loginValidate", async (req, res) => {
  let userName = req.body.userName;
  let userPassword = req.body.userPassword;

  UserModel.find(
    { userName: userName, userPassword: userPassword },
    (err, result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.send("invalid");
      }
    }
  );
});

router.post("/userInfo", async (req, res) => {
  let userName = req.body.userName;
  UserModel.find({ userName: userName }, (err, result) => {
    if (err) res.send("ERROR");
    else res.send(result);
  });
});

router.post("/userInfoById", async (req, res) => {
  let userId = req.body.userId;
  UserModel.find({ _id: userId }, (err, result) => {
    if (err) res.send("ERROR");
    else res.send(result);
  });
});

router.get("/", (req, res) => {
  res.send("Inside user router");
});

module.exports = router;
