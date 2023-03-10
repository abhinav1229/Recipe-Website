import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/edituser.css";
import isUrl from "is-url"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const EditUser = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [instagramURL, setInstgramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    if (isUrl(facebookURL)){
        console.log('Looks like an URI');
    } else {
        console.log('Not a URI');
    }
  }

  return (
    <>
      <Navbar />
      <main className="EditUser">
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" id="profileImage" />
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
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
