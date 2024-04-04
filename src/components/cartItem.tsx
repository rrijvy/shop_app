"use client";

import { ICartItem } from "@/models/ICartItem";

type Props = {
  item?: ICartItem;
  decreaseQuantity: (item?: ICartItem) => void;
  increaseQuantity: (item?: ICartItem) => void;
  deleteItem: (item?: ICartItem) => void;
};

const CartItem = (props: Props) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">{props.item?.imageLink}</div>
      <div className="cart-item-code">{props.item?.productCode}</div>
      <div className="cart-item-quantity">
        <button className="change-qty-btn" onClick={() => props.decreaseQuantity(props.item)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        {props.item?.quantity}
        <button className="change-qty-btn" onClick={() => props.increaseQuantity(props.item)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="cart-item-price">&#2547; {props.item?.total}</div>
      <div className="cart-item-remove" onClick={() => props.deleteItem(props.item)}>
        <i className="far fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default CartItem;
