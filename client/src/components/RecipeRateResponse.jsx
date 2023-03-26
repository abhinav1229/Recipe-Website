import React, { useState } from "react";

import AddReview from "./AddReview";
import { BASE_URL } from "../helper/ref.js";
import StarRatings from "react-star-ratings";
import Axios from "axios";

const RecipeRateResponse = ({ recipeId }) => {
  const [rating, setRating] = useState(0);
  let ratingUserName = JSON.parse(localStorage.getItem("userInfo"));
  function saveRating(newRating) {
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
