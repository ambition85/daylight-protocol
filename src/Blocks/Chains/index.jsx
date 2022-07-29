import React from "react";
import "./style.css";
// import Icon from "../../components/Icon";
import Lottie from "lottie-react";
import mobile from "../..//assets/animations//Diamonds-mobile.json";
import desktop from "../..//assets/animations//Diamonds-desktop.json";

// import ChainIcon from "../../assets/img/brand/chainBg.svg";
// import chainBgSmall from "../../assets/img/brand/chainBgSmall.svg";
const ChainsSection = () => {
  return (
    <div className="chainsection-container aic">
      {/* <div className="chainsection--info">
        Reconstructing Deconstructed Decentralized Finance
      </div> */}

      <div className="chainsection--logo aic">
        <Lottie animationData={desktop} loop={true} />
      </div>
      <div className="chainsection--logo-small">
        <Lottie animationData={mobile} loop={true} />
      </div>

      {/* <Icon imgsrc={ChainIcon} classnamestyle="chainsection--logo aic" /> */}
      {/* <Icon imgsrc={chainBgSmall} classnamestyle="chainsection--logo-small " /> */}
    </div>
  );
};

export default ChainsSection;
