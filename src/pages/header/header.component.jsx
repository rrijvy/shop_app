import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CartLogo from "./../../components/cartLogo/cartLogo.component";
import CartDropdown from "./../../components/cartDropdown/cartDropdown.component";

import "./header.styles.scss";
import logo from "./../../logo.svg";

const Header = ({ isCartHidden }) => {
  return (
    <header>
      <div className="navbar">
        <Link to="/">
          <div className="navbar-logo-container">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="navbar-menu">
          <div className="navbar-menu-ul">
            <Link to="/shop">
              <div className="navbar-menu-ul-li">
                <span>SHOP</span>
              </div>
            </Link>
            <Link to="/contactUs">
              <div className="navbar-menu-ul-li">
                <span>CONTACT US</span>
              </div>
            </Link>
            <Link to="/signIn">
              <div className="navbar-menu-ul-li">
                <span>SIGN IN</span>
              </div>
            </Link>
            <div className="navbar-menu-ul-li">
              <span>
                <CartLogo />
              </span>
            </div>
          </div>
        </div>
      </div>
      {isCartHidden ? null : <CartDropdown />}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isCartHidden: state.cart.isCartHidden,
  };
};

export default connect(mapStateToProps)(Header);
