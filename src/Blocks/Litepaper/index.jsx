import React from "react";
import "./style.css";
import Icon from "../../components/Icon";
import logoMascot from "../..//assets/img/brand/litepaper.svg";
const Litepaper = () => {
  return (
    <div className="aic litepaper-container">
      <Icon imgsrc={logoMascot} classnamestyle="litepaper-logo" />
      <div className="aic litepaper--info">
        <div className=" litepaper--info-title">Project Daylight</div>
        <div className="litepaper--button aic">LITEPAPER</div>
      </div>
    </div>
  );
};

export default Litepaper;
