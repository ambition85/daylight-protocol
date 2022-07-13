import React from "react";
import "./style.css";
import DexImg from "../../assets/img/brand/dex3.svg";
import dexMobile from "../../assets/img/brand/dexMobile.svg";
import Icon from "../../components/Icon";
const DexSection = () => {
  return (
    <div className="dexsection-container aic">
      <div className="dexsection--title">ORION - THE DAYLIGHT DEX</div>
      <div className="dexsection--subtitle">
        Built for native liquidity and maximum sustainability.
      </div>
      <Icon imgsrc={DexImg} classnamestyle="dexsection--animation-img" />
      <Icon
        imgsrc={dexMobile}
        classnamestyle="dexsection--animation-img-mobile"
      />
      <div className="dexsection--description">
        Many initiatives in the DeFi 3.0 arena have failed in our
        blockchain-based world due to lack of sustainability and breach of
        limitations.
      </div>
    </div>
  );
};

export default DexSection;
