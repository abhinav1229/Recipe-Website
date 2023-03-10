const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const ProfileModel = require("../Db/profile");

router.post("/updateProfile", async (req, res) => {
    const userName = req.body.userNmae;
    const userBio = req.body.bio;
    const userSocialLinks = req.body.socialLinks;
    const userProfileImageId = req.body.imageId;


    const profile = new ProfileModel({
        userName: userName, 
        userBio: userBio, 
        userSocialLinks: userSocialLinks,
        userProfileImageId: userProfileImageId, 
    });

    try{
        await profile.save();
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;
