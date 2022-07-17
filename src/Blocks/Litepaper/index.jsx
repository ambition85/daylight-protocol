import React from "react";
import "./style.css";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import logoMascot from "../..//assets/img/brand/litepaper.svg";
const Litepaper = () => {
  return (
    <div className="aic litepaper-container">
      <Icon imgsrc={logoMascot} classnamestyle="litepaper-logo" />
      <div className="aic litepaper--info">
        <div className=" litepaper--info-title">Project Daylight</div>
        <Button>LITEPAPER</Button>
      </div>
    </div>
  );
};

export default Litepaper;
