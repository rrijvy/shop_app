import React from "react";

import "./addToCart.styles.scss";

const AddToCart = ({ children, handleClick }) => (
  <button className="addToCart" onClick={handleClick}>
    {children}
  </button>
);

export default AddToCart;
