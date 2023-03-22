const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String, 
    required: true, 
  }, 
  fullName: {
    type: String, 
    required: true,
  },
  userBio: {
    type: String, 
  }, 
  userSocialLinks: {
    type: Array,
  }, 
  profileImageId: {
    type: String,
  },
});

const Profile = mongoose.model("profiles", ProfileSchema);
module.exports = Profile;
