import React from "react";
import { connect } from "react-redux";

import "./cartItem.styles.scss";

const CartItem = ({ item, increaseQuantity, decreaseQuantity, deleteItem }) => {
  const { code, quantity, total } = item;
  return (
    <div className="cart-item">
      <div className="cart-item-image">image</div>
      <div className="cart-item-code">{code}</div>
      <div className="cart-item-quantity">
        <button
          className="change-qty-btn"
          onClick={() => decreaseQuantity(item)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {quantity}
        <button
          className="change-qty-btn"
          onClick={() => increaseQuantity(item)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="cart-item-price">&#2547; {total}</div>
      <div
        className="cart-item-remove"
        onClick={() => {
          deleteItem(item);
        }}
      >
        <i className="far fa-trash-alt"></i>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQuantity: (item) =>
      dispatch({
        type: "INCREASE_QUANTITY",
        payload: item,
      }),
    decreaseQuantity: (item) =>
      dispatch({
        type: "DECREASE_QUANTITY",
        payload: item,
      }),
    deleteItem: (item) =>
      dispatch({
        type: "DELETE_ITEM",
        payload: item,
      }),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
