"use client";

import Link from "next/link";
import CartItem from "./cartItem";
import { ICartItem } from "@/models/ICartItem";

type Props = { cartItems: Array<ICartItem>; show: boolean };

const CartDropdown = (props: Props) => {
  if (!props.show) return null;

  return (
    <div className="cart-dropdown-container">
      <div className="cart-dropdown-items">
        {props.cartItems.map((item) => (
          <CartItem key={item.cartItemId} item={item} increaseQuantity={() => {}} decreaseQuantity={() => {}} deleteItem={() => {}} />
        ))}
      </div>
      <Link href="/checkout">
        <button className="checkout-button">CHECK OUT</button>
      </Link>
    </div>
  );
};

export default CartDropdown;
