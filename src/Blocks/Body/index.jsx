import React from "react";
// import Header from "../../components/Header";
import "./style.css";

const Body = ({ children }) => {
  return (
    <div className="body-container">
      {/* <Header /> */}

      {children}
    </div>
  );
};

export default Body;
