import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CartItem from "./../cartItem/cartItem.component";

import "./cartDropdown.styles.scss";

const CartDowpdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-dropdown-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item}></CartItem>
        ))}
      </div>
      <Link to="/checkout">
        <button className="checkout-button">CHECK OUT</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps)(CartDowpdown);
