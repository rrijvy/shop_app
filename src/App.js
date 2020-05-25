import React from "react";
import { connect } from "react-redux";

import Header from "./pages/header/header.component";
import Homepage from './pages/homepage/homepage.component';
import ContactUs from "./pages/contactUs/contactUs.component";
import Shop from "./pages/shop/shop.component";
import Checkout from "./pages/checkout/checkout.component";
import ProductForm from "./pages/forms/productForm/productFrom.component";

import "./App.css";
import { Route } from "react-router-dom";

function App({ user }) {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/contactus" component={ContactUs} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/product" component={ProductForm} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
