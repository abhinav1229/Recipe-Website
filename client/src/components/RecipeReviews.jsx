import React, { useEffect, useState } from "react";
import Axios, { all } from "axios";
import "../styles/recipeReviews.css";
import { BASE_URL } from "../helper/ref.js";

const RecipeReviews = ({ recipeId }) => {
  const [showReview, setShowReview] = useState(true);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    async function fetchReviewsFromDB() {
      Axios.post(`${BASE_URL}/rating/fetchReviews`, {
        recipeId: recipeId,
      })
        .then((response) => {
          if (response.data.length) {
            // array of all reviews
            setAllReviews(response.data[0].recipeRating);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchReviewsFromDB();
  }, []);

  return (
    <>
      <div className="reviewCount">
        <button onClick={() => setShowReview(!showReview)}>
          {showReview ? "Show" : "Hide"} Review (
          {allReviews ? allReviews.length : ""})
        </button>
      </div>
      {!showReview &&
        allReviews.map((reviewObj, index) => {
          return reviewObj.review.length ? (
            <div key={index} className="singleReviewContainer">
              <div className="reviewUserName">
                <div className="userName">{reviewObj.userName}</div>
                <div className="reviewTime">• 2 days ago</div>
              </div>
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
