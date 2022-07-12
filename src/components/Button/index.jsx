import React from "react";
import "./style.css";

const Button = (props) => {
  const { children, onclick } = props;
  const clickHandler = () => {
    if (!!onclick) {
      onclick();
    }
  };
  return (
    <div {...props} className="button-container" onClick={() => clickHandler()}>
      {children}
    </div>
  );
};

export default Button;
