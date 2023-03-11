import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/recipeUser.css";
import Axios from "axios"
import { BASE_URL } from "../helper/ref";

const RecipeUser = ({ userId, recipeSaveTime }) => {
  const date = new Date(recipeSaveTime);
  const month = date.toLocaleString("default", { month: "short" });

  const [userName, setUserName] = useState("")
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    Axios.post((`${BASE_URL}/user/userInfoById`), {
      userId: userId
    }).then((response) => {
      console.log("USER: ", response);
      setUserName(response.data[0].userName)
      setFullName(response.data[0].fullName)
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <NavLink to={"/aboutuser/" + userName}>
      <div className="userRecipeProfile">
        <div className="imageContainer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/1200px-OOjs_UI_icon_userAvatar-progressive.svg.png"
            alt="user"
          />
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
