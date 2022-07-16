import React from "react";
import "./style.css";
import Icon from "../../components/Icon";
import ChainIcon from "../../assets/img/brand/chainBg.svg";
const ChainsSection = () => {
  return (
    <div className="chainsection-container aic">
      <Icon imgsrc={ChainIcon} classnamestyle="chainsection--logo aic" />
      <div className="chainsection--info">
        Reconstructing Deconstructed Decentralized Finance
      </div>
    </div>
  );
};

export default ChainsSection;
