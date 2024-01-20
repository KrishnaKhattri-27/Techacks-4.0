import React from "react";
import "./Button.css";

const Button = ({ text, funcName, type }) => {
  return (
    <button
      className="buttonCSS"
      Buttontype={type}
      onClick={funcName}
    >
      {text}
    </button>
  );
};

export default Button;
