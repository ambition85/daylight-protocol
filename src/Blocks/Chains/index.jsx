import React from "react";
import "./style.css";
import Lottie from "lottie-react";
import mobile from "../..//assets/animations//Diamonds-mobile.json";
import desktop from "../..//assets/animations//Diamonds-desktop.json";

const ChainsSection = () => {
  return (
    <div className="chainsection-container aic">
      <div className="chainsection--logo aic">
        <Lottie animationData={desktop} loop={true} />
      </div>
      <div className="chainsection--logo-small">
        <Lottie animationData={mobile} loop={true} />
      </div>
    </div>
  );
};

export default ChainsSection;
