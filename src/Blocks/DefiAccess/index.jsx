import React from "react";
import "./style.css";
import Logo from "../../assets/img/brand/logoBig.svg";
import defiBg from "../../assets/img/brand/defiBg.svg";

const DefiAccess = () => {
  return (
    <div className="defiaccess-container" id="sustainability">
      <div className="defiaccess--backgroung">
        <img src={defiBg} alt="defiBg" className="defiaccess--backgroung-img" />
      </div>
      <div className="defiaccess-container-inner">
        <div className="defiaccess--info">
          <div className="defiaccess--info-title">
            Sustainable Wealth Generation
          </div>
          <div className="defiaccess--info-sub">
            Paving the way for DeFi wealth generation with inclusion,
            innovation, and sustainability.
          </div>
        </div>
        <div className="defiaccess-brand">
          <img
            src={Logo}
            alt="daylight brand"
            className="defiaccess-brand-img"
          />
        </div>
      </div>
    </div>
  );
};

export default DefiAccess;
