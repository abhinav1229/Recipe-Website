import React, { useState, useEffect } from "react";
import "../styles/recipe.css";
import "../styles/recipeUser.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";

const Recipe = (props) => {
  const { recipeName, recipeDescription, recipeId, recipeImageId } = props;
  const [imageInfo, setImageInfo] = useState({});

  useEffect(() => {
    Axios.post(`${BASE_URL}/image/getImage`, {
      recipeImageId: recipeImageId
    }).then((response) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array((response.data[0].img.data.data)))
      )
      setImageInfo(base64String);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className="recipeContainer">
      <NavLink to={"/aboutrecipe/" + recipeId}>
        <div className="recipe">
          <div className="imgContainer">
            {
              Object.keys(imageInfo).length !== 0 && <img src={`data:image/png;base64,${imageInfo}`} alt={recipeName} />
            }
          </div>
          <div className="contentContainer">
            <div className="recipeName">{recipeName}</div>
            <p>
              {recipeDescription.length >= 140
                ? recipeDescription.slice(0, 140) + "..."
                : recipeDescription.padEnd(140, "  ")}
            </p>
          </div>
          <div className="buttonContainer"></div>
        </div>
      </NavLink>
    </div>
  );
};

export default Recipe;
