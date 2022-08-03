import React from "react";
import "./style.css";
import Lottie from "lottie-react";
import DexImg from "../..//assets/animations/Daylight-DEX-Desktop.json";
import DexMobile from "../..//assets/animations/Daylight-DEX-Mobile.json";

const DexSection = () => {
  return (
    <>
      <div className="dexsection2-container aic" id="dex">
        <div className="dexsection2--img">
          <Lottie animationData={DexImg} loop={true} />
        </div>
        <div className="dexsection2--img-mobile">
          <Lottie animationData={DexMobile} loop={true} />
        </div>
      </div>
    </>
  );
};

export default DexSection;
