import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Recipes from "../components/Recipes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Navbar active={"home"} />
          <Recipes />
        </>
      )}
    </div>
  );
};

export default Home;
