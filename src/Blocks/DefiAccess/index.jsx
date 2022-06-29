import React from "react";
import "./style.css";
import Logo from "../../assets/img/brand/logoBig.svg";

const DefiAccess = () => {
  return (
    <div className="defiaccess-container">
      <div className="defiaccess--info">
        <div className="defiaccess--info-title">Unparalleled DeFi Access</div>
        <div className="defiaccess--info-sub">
          Bridging the gap between CeFi and DeFi
        </div>
      </div>
      <div className="defiaccess-brand">
        <img src={Logo} alt="daylight brand" className="defiaccess-brand-img" />
      </div>
    </div>
  );
};

export default DefiAccess;
