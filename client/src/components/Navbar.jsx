import React from "react";
import { Link } from "react-router-dom";
import User from "../components/User";
import "../styles/navbar.css";

const Navbar = ({ active }) => {
  return (
    <div className="navbar">
      <User />
      <Link
        className={active === "home" ? "navPageRoutes active" : "navPageRoutes"}
        to="/"
      >
        Home
      </Link>
      <Link
        className={
          active === "addnew" ? "navPageRoutes active" : "navPageRoutes"
        }
        to="/addnew"
      >
        Add Recipes
      </Link>
      <Link
        className={
          active === "contact" ? "navPageRoutes active" : "navPageRoutes"
        }
        to="/contact"
      >
        Contact
      </Link>
      <Link className="navPageRoutes" to="/login">
        Logout
      </Link>
    </div>
  );
};

export default Navbar;
