import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";

const Navbar = ({ title, icon }) => {
  const authCTX = useContext(AuthContext);

  let links = (
    <React.Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </React.Fragment>
  );

  const logoutHandler = () => authCTX.logout();

  if (authCTX.isAuth) {
    links = (
      <React.Fragment>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <a href="#!" onClick={logoutHandler}>
            <i className="fas fa-sign-out-alt"></i>Logout
          </a>
        </li>
        {authCTX.user && (
          <li>
            <i className="fas fa-user"></i> {authCTX.user.email}
          </li>
        )}
      </React.Fragment>
    );
  }

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>{links}</ul>
    </div>
  );
};

export default Navbar;
