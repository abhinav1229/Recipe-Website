import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/recipeUser.css";
import Axios from "axios";
import { BASE_URL } from "../helper/ref";
import ProfileImage from "../helper/profile.png"

const RecipeUser = ({ userId, recipeSaveTime }) => {
  const date = new Date(recipeSaveTime);
  const month = date.toLocaleString("default", { month: "short" });

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [imageInfo, setImageInfo] = useState({});

  useEffect(() => {
    Axios.post(`${BASE_URL}/user/userInfoById`, {
      userId: userId,
    })
      .then((response) => {
        setUserName(response.data[0].userName);
        setFullName(response.data[0].fullName);
        Axios.get(`${BASE_URL}/image/profileImage`, {
          params: {
            userName: response.data[0].userName,
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
            // console.log("RP: ", response);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <NavLink to={"/aboutuser/" + userName}>
      <div className="userRecipeProfile">
        <div className="imageContainer">
          {Object.keys(imageInfo).length !== 0 ? (
            <img src={`data:image/png;base64,${imageInfo}`} alt={userName} />
          ) : (
            <img src={ProfileImage} alt={userName} />
          )}
        </div>
        <div className="userDataContainer">
          <div className="user"> {fullName} </div>
          <div className="username">
            {date.getDate()} {month}, {date.getFullYear()}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default RecipeUser;
