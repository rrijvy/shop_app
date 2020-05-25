import React from "react";
import { connect } from "react-redux";

import "./cartLogo.styles.scss";

const CartLogo = ({ toggleCartHidden, cartItems }) => (
  <React.Fragment>
    <i className="fas fa-shopping-bag" onClick={toggleCartHidden}></i>
    <span>{cartItems.length}</span>
  </React.Fragment>
);

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartHidden: () => dispatch({ type: "TOGGLE_CART_HIDDEN" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartLogo);
