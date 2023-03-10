import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

import "../styles/userInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {faPencil} from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom";

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam totam voluptates saepe, quasi magnam, ut recusandae soluta amet culpa, quaerat dolorem nostrum veritatis. Nostrum consectetur suscipit nesciunt id, odio sequi?
            </p>
            <div className="socialMediaLinkContainer">
              <a
                href="http://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="fa-2x icon-hover"
                />
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="fa-2x icon-hover"
                />
              </a>

              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="fa-2x icon-hover"
                />
              </a>
            </div>
            <NavLink className={"editLink"} to={"/aboutrecipe/edit/" + userData.userName }>Edit Profile <FontAwesomeIcon
                  icon={faPencil}
                  
                /></NavLink>
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
