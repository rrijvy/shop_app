import { addToCart, increaseQuantity, decreaseQuantity, deleteItem } from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
  isCartHidden: true,
};

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_CART_HIDDEN":
      return {
        ...state,
        isCartHidden: !state.isCartHidden,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: addToCart(state.cartItems, action.payload),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: increaseQuantity(state.cartItems, action.payload),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: decreaseQuantity(state.cartItems, action.payload),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: deleteItem(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cart;
