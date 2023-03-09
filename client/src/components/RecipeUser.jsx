import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/recipeUser.css";

const RecipeUser = ({ fullName, userName, recipeSaveTime }) => {
  const date = new Date(recipeSaveTime);
  const month = date.toLocaleString("default", { month: "short" });

  console.log(date);

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
