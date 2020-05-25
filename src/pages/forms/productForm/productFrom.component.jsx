import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Input from "./../../../components/UI/input/input";
import ButtonCustom from "./../../../components/buttonCustom/buttonCustom.component";

import "./productForm.styles.scss";

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      price: "",
      productTypeId: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);

    axios({
      method: "post",
      url: "/product",
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
    const forms = [
      {
        label: "Name",
        config: {
          name: "name",
          placeholder: "Product Name",
        },
        type: "input",
        value: this.state.name,
        event: this.handleChange,
      },
      {
        label: "Price",
        config: {
          name: "price",
          placeholder: "Product Price",
        },
        type: "input",
        value: this.state.price,
        event: this.handleChange,
      },
      {
        label: "Product Type",
        config: {
          name: "productTypeId",
          options: this.props.productCategories.map((x) => {
            return {
              value: x.id,
              text: x.name,
            };
          }),
        },
        type: "select",
        value: this.state.productTypeId,
        event: this.handleChange,
      },
    ];
    return (
      <div className="product-form">
        <form onSubmit={this.handleSubmit}>
          {forms.map((element) => (
            <Input
              key={element.label}
              label={element.label}
              elementConfig={element.config}
              handleChange={element.event}
              value={element.value}
              elementType={element.type}
            />
          ))}
          <ButtonCustom type="submit">Submit</ButtonCustom>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productCategories: state.productCategory.productCategories,
  };
};

export default connect(mapStateToProps)(ProductForm);
