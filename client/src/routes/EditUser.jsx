import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/edituser.css";
import isUrl from "is-url";
import { BASE_URL } from "../helper/ref";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const EditUser = () => {
  const [fullName, setFullName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [instagramURL, setInstgramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [showRedWarning, setShowRedWaring] = useState(false);
  const [userNameWarningMessage, setUserNameWarningMessage] = useState("");

  const navigate = useNavigate();

  const localData = JSON.parse(localStorage.getItem("userInfo"));
  const userName = localData.userName;

  // fetch the data from the database if user has already
  // saved his profile before
  useEffect(() => {
    Axios.get(`${BASE_URL}/profile/getProfile`, {
      params: {
        userName: userName
      }
    })
      .then((response) => {
        const user = response.data[0];
        setFullName(user.fullName);
        setNewUserName(user.userName);
        setUserBio(user.userBio);
        setFacebookURL(user.userSocialLinks[0]);
        setInstgramURL(user.userSocialLinks[1]);
        setTwitterURL(user.userSocialLinks[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function allLinkAreValid() {
    if (facebookURL && !isUrl(facebookURL)) {
      alert("Invalid Facebook Profile Link");
      return 0;
    } else if (instagramURL && !isUrl(instagramURL)) {
      alert("Invalid Instagram Profile Link");
      return 0;
    } else if (twitterURL && !isUrl(twitterURL)) {
      alert("Invalid Twitter Profile Link");
      return 0;
    } else {
      return 1;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (allLinkAreValid()) {
      Axios.put(`${BASE_URL}/profile/updateProfile`, {
        userName: userName,
        newUserName: newUserName,
        fullName: fullName,
        userBio: userBio,
        facebookURL: facebookURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
      })
        .then((response) => {
          localData.userName = newUserName;
          localData.fullName = fullName;
          localStorage.setItem("userInfo", JSON.stringify(localData));
          navigate("/");
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function uploadImage(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("profileImage", event.target.files[0]);
    data.append("userName", newUserName);
    Axios.post(`${BASE_URL}/image/profileImageUpload`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkUserName(e) {
    setNewUserName(e.target.value);
    if (e.target.value.length > 4) {
      if (e.target.value.match(/^[a-zA-Z0-9]+$/)) {
        setUserNameWarningMessage("");
        setTimeout(() => {
          Axios.post(`${BASE_URL}/user/userInfo`, {
            userName: e.target.value,
          })
            .then((response) => {
              console.log(response.data);
              if (response.data.length) {
                setUserNameWarningMessage(
                  "That username has been taken. Please choose another."
                );
                setShowRedWaring(true);
              } else {
                setUserNameWarningMessage(
                  "Congrats! The username is available"
                );
                setShowRedWaring(false);
              }
            })
            .catch((err) => {
              console.log("ERR", err);
            });
        }, 1000);
      } else {
        setUserNameWarningMessage(
          "Your username can only contain letters, numbers and '_'"
        );
        setShowRedWaring(true);
      }
    } else {
      setUserNameWarningMessage(
        "Your username must be longer than 4 characters."
      );
      setShowRedWaring(true);
    }
  }

  return (
    <>
      <Navbar />
      <main className="EditUser">
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" id="profileImage" onChange={uploadImage} />
          </div>
          <div className="formGroup">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              value={newUserName}
              onChange={checkUserName}
            />
            <p
              className={showRedWarning ? "userNameExist" : "userNameNotExist"}
            >
              {userNameWarningMessage}
            </p>
          </div>
          <div className="formGroup">
            <label htmlFor="userBio">Add Bio</label>
            <textarea
              name=""
              id="userBio"
              cols="30"
              rows="5"
              placeholder="Tell about yourself (max 30 words)"
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
            ></textarea>
          </div>
          <div className="formGroup socialFormGroup">
            <label htmlFor="facebook">
              <FontAwesomeIcon icon={faFacebook} className="fa-2x icon-hover" />
            </label>
            <input
              type="text"
              id="facebook"
              placeholder="Link to facebook profile"
              value={facebookURL}
              onChange={(e) => setFacebookURL(e.target.value)}
            />
          </div>
          <div className="formGroup socialFormGroup">
            <label htmlFor="instagram">
              <FontAwesomeIcon
                icon={faInstagram}
                className="fa-2x icon-hover"
              />
            </label>
            <input
              type="text"
              id="instagram"
              placeholder="Link to instagram profile"
              value={instagramURL}
              onChange={(e) => setInstgramURL(e.target.value)}
            />
          </div>
          <div className="formGroup socialFormGroup">
            <label htmlFor="twitter">
              <FontAwesomeIcon icon={faTwitter} className="fa-2x icon-hover" />
            </label>
            <input
              type="text"
              id="twitter"
              placeholder="Link to twitter profile"
              value={twitterURL}
              onChange={(e) => setTwitterURL(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <input type="submit" value={"Update"} />
          </div>
        </form>
      </main>
    </>
  );
};

export default EditUser;
