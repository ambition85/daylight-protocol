import React from "react";
import "./style.css";
// import DexImg from "../../assets/img/brand/dex.svg";
// import dexMobile from "../../assets/img/brand/dexMobile.svg";
// import Icon from "../../components/Icon";
// import FlamesLayer from "../../components/FlamesLayer";
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

        {/* <Icon imgsrc={DexImg} classnamestyle="dexsection2--img" /> */}
        {/* <Icon imgsrc={dexMobile} classnamestyle="dexsection2--img-mobile" /> */}
      </div>

      {/* <FlamesLayer offsetY={offsetY - 3700} /> */}
    </>
  );
};

export default DexSection;
