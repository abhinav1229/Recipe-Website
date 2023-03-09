import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

import "../styles/userInfo.css";

const UserInfo = ({ userData, allUserRecipes }) => {
  return (
    <>
      <div className="UserInfo">
        <div className="topSection">
          <div className="left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/1200px-OOjs_UI_icon_userAvatar-progressive.svg.png"
              alt="img"
            />
          </div>
          <div className="right">
            <h1>{userData.fullName}</h1>
            <h3>{userData.userName}</h3>
          </div>
        </div>
        <div className="bottomSection">
          <div className="text">
            <span>My Recipes </span>{" "}
          </div>
          <div className="recipeContainerAll">
            {allUserRecipes.map((recipe, index) => {
              return (
                <Recipe
                  key={recipe._id}
                  recipeName={recipe.recipeName}
                  recipeIngradients={recipe.recipeIngradients}
                  recipeDescription={recipe.recipeDescription}
                  recipeNote={recipe.recipeNote}
                  recipeImageId={recipe.recipeImageId}
                  recipeId={recipe._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
