import React from "react";
import { connect } from "react-redux";

import AddToCart from "./../addToCart/addToCart.component";

import "./productCard.styles.scss";

const ProductCard = ({ product, addToCart }) => {
  const { code, price } = product;
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src="#" alt="product" />
        <AddToCart handleClick={() => addToCart(product)}>
          Add To Cart
        </AddToCart>
      </div>
      <div className="product-card-details">
        <div className="product-card-details-code">CODE: {code}</div>
        <div className="product-card-details-price">&#2547; {price}</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) =>
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      }),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
