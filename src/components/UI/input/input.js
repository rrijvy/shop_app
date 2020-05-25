import React from "react";
import "./input.css";

const input = ({ elementType, label, handleChange, elementConfig, value }) => {
  let inputElement = null;

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className="input"
          {...elementConfig}
          value={value}
          onChange={handleChange}
          required
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className="textarea"
          {...elementConfig}
          onChange={handleChange}
        >
          {value}
        </textarea>
      );
      break;
    case "select":
      inputElement = (
        <select className="select" {...elementConfig} onChange={handleChange}>
          <option>Select Item</option>
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>{option.text}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = null;
      break;
  }

  return (
    <div className="group">
      <label>{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
