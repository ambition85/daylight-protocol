import React from "react";
import "./style.css";

const Button = (props) => {
  const { children } = props;
  return (
    <div {...props} className="button-container aic">
      {children}
    </div>
  );
};

export default Button;
