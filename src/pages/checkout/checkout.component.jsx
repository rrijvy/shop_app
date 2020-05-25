import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import InputForm from "./../../components/inputForm/inputForm.component";
import CartItem from "./../../components/cartItem/cartItem.component";

import "./checkout.styles.scss";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let { cartItems } = this.props;

    console.log({ ...this.state, cartItems: [...cartItems] });

    axios({
      method: "post",
      url: "/checkout",
      data: { ...this.state },
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    let { cartItems } = this.props;

    return (
      <div className="checkout">
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <div>
            <InputForm
              label="First Name"
              name="firstName"
              type="text"
              value={this.state.firstName}
              handleChange={this.handleChange}
            />
            <InputForm
              label="Last Name"
              name="lastName"
              type="text"
              value={this.state.lastName}
              handleChange={this.handleChange}
            />
          </div>
          <div>
            <InputForm
              label="Email"
              name="email"
              type="text"
              value={this.state.email}
              handleChange={this.handleChange}
            />
            <InputForm
              label="Phone"
              name="phone"
              type="text"
              value={this.state.phone}
              handleChange={this.handleChange}
            />
          </div>
          <button className="checkout-confirm" type="submit">
            SUBMIT
          </button>
        </form>
        <div className="checkout-cart">
          <h1>CHECK YOUR CART ITEMS</h1>
          {cartItems.map((item) => {
            return <CartItem key={item.id} item={item}></CartItem>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
