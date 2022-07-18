import React from "react";
import "./style.css";
import DexImg from "../../assets/img/brand/dex.svg";
import dexMobile from "../../assets/img/brand/dexMobile.svg";
import Icon from "../../components/Icon";
const DexSection = () => {
  return (
    <div className="dexsection2-container aic" id="dex">
      <Icon imgsrc={DexImg} classnamestyle="dexsection2--img" />
      <Icon imgsrc={dexMobile} classnamestyle="dexsection2--img-mobile" />
    </div>
  );
};

export default DexSection;
