const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const UserModel = require("../Db/user");

const sendMail = "amitrecb@gmail.com";
const sendPassword = "ifhcaihchcvydzha";

const generateOtp = () => {
  return Math.floor(Math.random() * (9999 - 1000)) + 1000 + "";
};

let generatedOtp = undefined;

router.post("/otp", async (req, res) => {
  let userEmail = req.body.userEmail;
  let userName = "Abhinav";

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: sendMail,
        pass: sendPassword,
      },
    });

    generatedOtp = generateOtp();
    const mailOptions = {
      from: sendMail,
      to: userEmail,
      subject: "Don't Share",
      html: `${userName}OTP is: ${generatedOtp}`,
    };

    transporter
      .sendMail(mailOptions)
      .then((response) => {
        UserModel.find({ userEmail: userEmail }, (err, result) => {
          result[0].userOtp = generatedOtp;
          result[0].save();
          res.send(generatedOtp);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/main", async (req, res) => {
  let userEmail = req.body.userEmail;
  UserModel.find({ userEmail: userEmail }, (err, result) => {
    if (result.length !== 0) {
      res.send("OK");
    } else {
      res.send("username");
    }
  });
});

router.post("/resetPassword", async (req, res) => {
  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;

  UserModel.find({ userEmail: userEmail }, (err, result) => {
    result[0].userPassword = userPassword;
    result[0].save();
    res.send("OK");
  });
});

router.post("/removeOtp", async (req, res) => {
  let userEmail = req.body.userEmail;

  UserModel.find({ userEmail: userEmail }, (err, result) => {
    result[0].userOtp = "";
    result[0].save();
    res.send("OK");
  });
});

module.exports = router;
