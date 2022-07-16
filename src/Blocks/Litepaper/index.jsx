import React from "react";
import "./style.css";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import logoMascot from "../..//assets/img/brand/logoMascot.svg";
const Litepaper = () => {
  return (
    <div className="aic litepaper-container">
      <Icon imgsrc={logoMascot} classnamestyle="litepaper-logo" />
      <div className="aic litepaper--info">
        <div className=" litepaper--info-title">Litepaper</div>
        <Button>Add Pre-Sale Token to Metamask</Button>
      </div>
    </div>
  );
};

export default Litepaper;
