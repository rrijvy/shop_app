import React, { Component } from "react";

import axios from "axios";

import ButtonCustom from "../../components/buttonCustom/buttonCustom.component";
import Input from "./../../components/UI/input/input";

import "./contactUs.styles.scss";

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      message: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log({ ...this.state });

    axios({
      method: "post",
      url: "/user/12345",
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
        label: "Email",
        config: {
          name: "email",
          placeholder: "Your mail address"
        },
        type: "input",
        value: this.state.email,
        event: this.handleChange,
      },
      {
        label: "Message",
        config: {
          name: "message",
          rows: 4,
        },
        type: "textarea",
        value: this.state.message,
        event: this.handleChange,
      },
    ];
    return (
      <div className="contact-us">
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

export default ContactUs;
