import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/loading.css";
import { BASE_URL } from "../helper/ref.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // clear the user from localStorage
  localStorage.setItem("userInfoRecipe", null);

  const checkUserExist = () => {
    Axios.post(`${BASE_URL}/user/loginValidate`, {
      userName: userName,
      userPassword: userPassword,
    })
      .then((response) => {
        if (response.data === "invalid") {
          setErrorMessage("Incorrect Username/Password");
          setLoading(false);
        } else {
          localStorage.setItem(
            "userInfoRecipe",
            JSON.stringify({
              userName: userName,
              fullName: response.data[0].fullName,
              userId: response.data[0]._id,
            })
          );
          navigate("/");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("There is a problem on login", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    checkUserExist();
  };

  return (
    <div className="mainLoginContainer">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="left">
            <p className="warningMessage">{errorMessage}</p>
            <form className="loginContainer" onSubmit={handleSubmit}>
              <h1> Login 🥂 </h1>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              <div className="passwordInputContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
                <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword ? (
                    <FontAwesomeIcon icon={faEye} style={{ color: "grey" }} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      style={{ color: "grey" }}
                    />
                  )}
                </div>
              </div>

              <div className="forgotPassword">
                <Link to={"/forgot"}>Forgot Password?</Link>
              </div>

              <button type="submit" className="firstButton">
                Login
              </button>
              <Link className="pageRouter" to={"/register"}>
                <button type="submit">Register</button>
              </Link>
            </form>
          </div>
          <div className="right">
            <img
              src="https://www.oliviascuisine.com/wp-content/uploads/2019/01/double-chocolate-chili.jpg"
              alt="img"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
