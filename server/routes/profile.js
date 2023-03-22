const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const ProfileModel = require("../Db/profile");
const UserModel = require("../Db/user");
// const RecipeModel = require("../Db/recipe");

router.put("/updateProfile", async (req, res) => {
  const userName = req.body.userName;
  const newUserName = req.body.newUserName;
  const fullName = req.body.fullName;
  const userBio = req.body.userBio;
  const facebookURL = req.body.facebookURL;
  const instagramURL = req.body.instagramURL;
  const twitterURL = req.body.twitterURL;
  const profileImageId = req.body.profileImageId;

  try {
    let profileData = await ProfileModel.find({
      userName: userName 
    })
    profileData[0].userName = newUserName;
    profileData[0].fullName = fullName;
    profileData[0].userBio = userBio;
    profileData[0].userSocialLinks = [facebookURL, instagramURL, twitterURL];
    profileData[0].profileImageId = profileImageId;

    // updating user
    let userData = await UserModel.find({
        userName: userName 
    })

    userData[0].userName = newUserName;
    userData[0].fullName = fullName;
    userData[0].save();
    profileData[0].save();
    res.send("updated successfully");
  } catch (err) { 
    console.log(err);
  }
});

router.get("/getProfile", (req, res) => {
  ProfileModel.find({ userName: req.query.userName }, (err, result) => {
    if (err) res.send("ERR");
    res.send(result);
  });
});

module.exports = router;
