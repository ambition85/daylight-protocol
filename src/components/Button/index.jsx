import React from "react";
import "./style.css";

const Button = ({ children, onclick }) => {
  const clickHandler = () => {
    if (!!onclick) {
      onclick();
    }
  };
  return (
    <div
      className="button-container hover-effect"
      onClick={() => clickHandler()}
    >
      {children}
    </div>
  );
};

export default Button;
