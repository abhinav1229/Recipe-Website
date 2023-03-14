import React, { useState, useEffect } from "react";
import "../styles/recipe.css";
import "../styles/recipeUser.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";

const Recipe = (props) => {
  const { recipeName, recipeDescription, recipeId, recipeImageId } = props;
  const [imageInfo, setImageInfo] = useState({});

  useEffect(() => {
    Axios.post(`${BASE_URL}/image/getImage`, {
      recipeImageId: recipeImageId,
    })
      .then((response) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(response.data[0].img.data.data))
        );
        setImageInfo(base64String);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipeImageId]);

  return (
    <div className="recipeContainer">
      <NavLink to={"/aboutrecipe/" + recipeId}>
        <div className="recipe">
          <div className="imgContainer">
            {Object.keys(imageInfo).length !== 0 && (
              <img
                src={`data:image/png;base64,${imageInfo}`}
                alt={recipeName}
              />
            )}
          </div>
          <div className="contentContainer">
            <div className="recipeName">{recipeName}</div>
            <p>
              {recipeDescription.length >= 140
                ? recipeDescription.slice(0, 140) + "..."
                : recipeDescription.padEnd(140, "  ")}
            </p>
          </div>
        </div>
        <div className="recipeHoverButtons">
          <NavLink to={"/aboutrecipe/" + recipeId}>
            {" "}
            <FontAwesomeIcon icon={faPencil} />
          </NavLink>
          <NavLink to={"/aboutrecipe/" + recipeId}>
            <FontAwesomeIcon icon={faTrash} />
          </NavLink>
        </div>
      </NavLink>
    </div>
  );
};

export default Recipe;
