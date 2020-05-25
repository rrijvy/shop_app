import { combineReducers } from 'redux';

import user from './user/user.reducer';
import product from './product/product.reducer';
import productCategory from './productCategory/productCategory.reducer';
import cart from './cart/cart.reducer';

const rootReducer = combineReducers({
    user: user,
    product: product,
    productCategory: productCategory,
    cart: cart
});

export default rootReducer;