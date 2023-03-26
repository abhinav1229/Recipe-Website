import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/login.css";
import "../styles/loading.css";
import { BASE_URL } from "../helper/ref.js";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkUserAvailability = () => {
    if (userPassword === userConfirmPassword) {
      Axios.post(`${BASE_URL}/user/registerValidate`, {
        userName: userName,
        userEmail: userEmail,
      })
        .then((response) => {
          if (response.data === "username") {
            setErrorMessage("This username already exists.");
            setLoading(false);
          } else if (response.data === "email") {
            setErrorMessage("This email is already used.");
            setLoading(false);
          } else {
            Axios.post(`${BASE_URL}/user/register`, {
              fullName: fullName,
              userName: userName,
              userEmail: userEmail,
              userPassword: userPassword,
            })
              .then((dataSaveResponse) => {
                navigate("/");
                setLoading(false);
              })
              .catch((saveDataError) => {
                console.log("Error to save!", saveDataError);
              });
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      setErrorMessage("Password does not match.");
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    checkUserAvailability();
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
              <h1> Register 🍫</h1>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
              <input
                type={"password"}
                placeholder="Confirm Password"
                value={userConfirmPassword}
                onChange={(e) => setUserConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="firstButton">
                Register
              </button>
              <Link className="pageRouter" to={"/login"}>
                <button type="submit">Login</button>
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

export default Register;
