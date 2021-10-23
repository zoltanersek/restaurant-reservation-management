import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./header.styles.scss";

const Header = () => {
    const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/layout-editor">
          Table Layout
        </Link>
        <Link className="option" to="/reservation-management">
          Reservations
        </Link>
        <Link className="option" to="/reporting">
          Reporting
        </Link>
        {currentUser ?         <Link className="option" to="/logout">
          LOGOUT
        </Link> :         <Link className="option" to="/signin">
          SIGN IN
        </Link> }
      </div>
    </div>
  );
};

export default Header;
