import React from "react";
import "./style.css";
import Icon from "../../components/Icon";
import ChainIcon from "../../assets/img/brand/chainBg.svg";
import chainBgSmall from "../../assets/img/brand/chainBgSmall.svg";
const ChainsSection = () => {
  return (
    <div className="chainsection-container aic">
      <div className="chainsection--info">
        Reconstructing Deconstructed Decentralized Finance
      </div>
      <Icon imgsrc={ChainIcon} classnamestyle="chainsection--logo aic" />
      <Icon imgsrc={chainBgSmall} classnamestyle="chainsection--logo-small " />
    </div>
  );
};

export default ChainsSection;
