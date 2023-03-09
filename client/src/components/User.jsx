import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/user.css";
import { BASE_URL } from "../helper/ref.js";
import { NavLink } from "react-router-dom";

const User = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    let user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user.fullName) {
      Axios.post(`${BASE_URL}/user/userInfo`, {
        userName: user.userName,
      })
        .then((response) => {
          setFullName(response.data[0].fullName);
          setUserName(response.data[0].userName);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ ...user, fullName: fullName })
          );
          // setLoading(false);
        })
        .catch((err) => {
          console.log("Error hai: ", err);
        });
    } else {
      setFullName(user.fullName);
      setUserName(user.userName);
    }
  }, [fullName]);

  return (
    <div className="userProfile">
      {/* {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : ( */}
      <>
        <div className="imageContainer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/1200px-OOjs_UI_icon_userAvatar-progressive.svg.png"
            alt="user"
          />
        </div>
        <div className="userDataContainer">
          <div className="user"> {fullName.length ? fullName : "..."} </div>
          <div className="username">
            @
            {userName.length ? (
              <NavLink to={"/aboutuser/" + userName}>{userName}</NavLink>
            ) : (
              "..."
            )}{" "}
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default User;
