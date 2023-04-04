import React, { useState } from "react";
import AddReview from "./AddReview";
import { BASE_URL } from "../helper/ref.js";
import StarRatings from "react-star-ratings";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeRateResponse = ({ recipeId }) => {
  const [rating, setRating] = useState(0);
  let ratingUserName = JSON.parse(localStorage.getItem("userInfoRecipe"));
  const navigate = useNavigate();

  function saveRating(newRating) {
    if (ratingUserName) {
      setRating(newRating);
      Axios.post(`${BASE_URL}/rating/setRating`, {
        userName: ratingUserName.userName,
        recipeId: recipeId,
        recipeRating: newRating,
      })
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (window.confirm("Please login to rate the racipe.") === true) {
        navigate("/login");
      }
    }
  }
  return (
    <>
      {rating ? (
        <AddReview recipeId={recipeId} userName={ratingUserName.userName} />
      ) : (
        <StarRatings
          rating={rating}
          starRatedColor="yellow"
          starHoverColor="yellow"
          numberOfStars={5}
          changeRating={(newRating) => saveRating(newRating)}
          starDimension="25px"
          starSpacing="5px"
          name="rating"
        />
      )}
    </>
  );
};

export default RecipeRateResponse;
