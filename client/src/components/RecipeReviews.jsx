import React, { useState } from "react";
import Axios from "axios";
import "../styles/recipeReviews.css";
import { BASE_URL } from "../helper/ref.js";

const RecipeReviews = ({ recipeId }) => {
  const [showReview, setShowReview] = useState(true);
  const [allReviews, setAllReviews] = useState([]);
  function fetchReviewsFromDB() {
    setShowReview(!showReview);
    if (showReview) {
      Axios.post(`${BASE_URL}/rating/fetchReviews`, {
        recipeId: recipeId,
      })
        .then((response) => {
          setAllReviews(response.data[0].recipeRating);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <div className="reviewCount">
        <button onClick={fetchReviewsFromDB}>
          {showReview ? "Show" : "Hide"} Review
        </button>
      </div>
      {!showReview &&
        allReviews.map((reviewObj, index) => {
          return reviewObj.review.length ? (
            <div key={index} className="singleReviewContainer">
              <div className="reviewUserName">{reviewObj.userName}</div>
              <div className="reviewDescription">{reviewObj.review}</div>
            </div>
          ) : (
            ""
          );
        })}
    </>
  );
};

export default RecipeReviews;
