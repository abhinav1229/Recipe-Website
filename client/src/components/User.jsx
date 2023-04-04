import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/user.css";
import { BASE_URL } from "../helper/ref.js";
import { NavLink } from "react-router-dom";
import Avatar from "react-avatar";

const User = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [imageInfo, setImageInfo] = useState({});

  let localData = JSON.parse(localStorage.getItem("userInfoRecipe"));
  useEffect(() => {
    if (localData) {
      if (!localData.fullName) {
        Axios.post(`${BASE_URL}/user/userInfo`, {
          userName: localData.userName,
        })
          .then((response) => {
            setFullName(response.data[0].fullName);
            setUserName(response.data[0].userName);
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ ...localData, fullName: fullName })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setFullName(localData.fullName);
        setUserName(localData.userName);
      }
    } else {
      setFullName("Guest User");
      setUserName("guest");
    }
  }, [fullName, localData]);

  useEffect(() => {
    if (localData) {
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
    }
  }, []);

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
            <Avatar name={fullName} size="50" round={true} src="" />
          )}
        </div>
        <div className="userDataContainer">
          <div className="user"> {fullName.length ? fullName.split(" ")[0] : "..."} </div>
          <div className="username">
            @
            {userName.length ? (
              <NavLink to={localData ? `/aboutuser/${userName}` : "/login"}>
                {userName}
              </NavLink>
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
