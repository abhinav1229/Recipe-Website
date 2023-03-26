import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/user.css";
import { BASE_URL } from "../helper/ref.js";
import { NavLink } from "react-router-dom";
import Profile from "../helper/profile1.png"

const User = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [imageInfo, setImageInfo] = useState({});

  let user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFullName(user.fullName);
      setUserName(user.userName);
    }
  }, [fullName, user]);

  let localData = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    Axios.get(`${BASE_URL}/image/profileImage`, {
      params: {
        userName: localData.userName,
      },
    })
      .then((response) => {
        if (response.data.length) {
          const base64String = btoa(
            String.fromCharCode(
              ...new Uint8Array(response.data[0].img.data.data)
            )
          );
          setImageInfo(base64String);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localData.userName]);

  return (
    <div className="userProfile">
      {/* {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : ( */}
      <>
        <div className="imageContainer">
          {Object.keys(imageInfo).length !== 0 ? (
            <img
              src={`data:image/png;base64,${imageInfo}`}
              alt={localData.userName}
            />
          ) : (
            <img
              src={Profile}
              alt={localData.userName}
            />
          )}
        </div>
        <div className="userDataContainer">
          <div className="user"> {fullName.length ? fullName : "..."} </div>
          <div className="username">
            @
            {userName.length ? (
              <NavLink to={"/aboutuser/" + userName}>{userName}</NavLink>
            ) : (
              "..."
            )}
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default User;
