import React from "react";
import Header from "../../components/Header";
import Sale from "./Sale";
import Info from "./Info";
import "./style.css";

const HeroSection = () => {
  return (
    <div className="hero-container-header">
      <Header />
      <div className="hero-container">
        <Sale progress={54} total={6000000} />
        <Info />
      </div>
    </div>
  );
};

export default HeroSection;
