import React from "react";
import "./style.css";
import DexImg from "../../assets/img/brand/dex.svg";
const DexSection = () => {
  return (
    <div className="dexsection-container">
      <div className="dexsection--title">Daylight DEX</div>
      <div className="dexsection--subtitle">Unlocking DeFi's Potential</div>
      <div className="dexsection--animation">
        <img
          className="dexsection--animation-img"
          src={DexImg}
          alt="dex"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="dexsection--description">
        In spite of accelerated innovation & development, decentralized
        exchanges have yet to find a perfect balance between transactional
        speed, cost & user experience.
      </div>
    </div>
  );
};

export default DexSection;
