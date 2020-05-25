export const addToCart = (cartItems, item) => {
  const isItemExist = cartItems.find((x) => x.id === item.id);

  if (isItemExist) {
    return cartItems.map((x) =>
      x.id === item.id
        ? { ...x, quantity: x.quantity + 1, total: (x.quantity + 1) * x.price }
        : x
    );
  }

  return [...cartItems, { ...item, quantity: 1, total: item.price }];
};

export const increaseQuantity = (cartItems, item) => {
  let index = cartItems.indexOf(item);

  cartItems[index] = {
    ...item,
    quantity: item.quantity + 1,
    total: (item.quantity + 1) * item.price,
  };

  return [...cartItems];
};

export const decreaseQuantity = (cartItems, item) => {
  let index = cartItems.indexOf(item);

  if (cartItems[index].quantity === 1) {
    if (window.confirm("Are you want to remove this item from cart?")) {
      cartItems.splice(index, 1);
      return [...cartItems];
    } else {
      return [...cartItems];
    }
  }

  cartItems[index] = {
    ...item,
    quantity: item.quantity - 1,
    total: (item.quantity - 1) * item.price,
  };

  return [...cartItems];
};

export const deleteItem = (cartItems, item) => {
  let index = cartItems.indexOf(item);

  if (index >= 0) {
    cartItems.splice(index, 1);
    return [...cartItems];
  }

  return cartItems;
};
