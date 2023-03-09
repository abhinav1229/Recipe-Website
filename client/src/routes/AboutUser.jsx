import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";

const AboutUser = () => {
  const { user } = useParams();
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});
  const [allUserRecipes, setAllUserRecipes] = useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.post(`${BASE_URL}/user/userInfo`, {
      userName: user,
    })
      .then((userResponse) => {
        Axios.post(`${BASE_URL}/recipe/recipeFindByUserName`, {
          userName: user,
        }).then((recipeResponse) => {
          setUserData(userResponse.data[0]);
          setAllUserRecipes(recipeResponse.data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <UserInfo userData={userData} allUserRecipes={allUserRecipes} />
      )}
    </>
  );
};

export default AboutUser;
