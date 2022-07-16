import React from "react";
import Header from "../../components/Header";
import Sale from "./Sale";
import Info from "./Info";
import "./style.css";
import Icon from "../../components/Icon";
import LogoMascot from "../../assets/img/brand/logoMascot.svg";

const HeroSection = ({
  setisWalletOptionsOpen,
  rate,
  startTime,
  endTime,
  claimTime,
  totalUsdc,
  totalDayl,
  usdcBalance,
  whitelisted,
  claimable,
  withdrawable,
  hardCap,
  softCap,
  addDaylToken,
  buyDayl,
  withdraw,
  claim,
}) => {
  return (
    <div className="hero-container-header" id="presale">
      <Header setisWalletOptionsOpen={setisWalletOptionsOpen} />
      <div className="hero-container">
        <Sale
          rate={rate}
          startTime={startTime}
          endTime={endTime}
          claimTime={claimTime}
          totalUsdc={totalUsdc}
          totalDayl={totalDayl}
          usdcBalance={usdcBalance}
          claimable={claimable}
          withdrawable={withdrawable}
          total={6000000}
          hardCap={hardCap}
          softCap={softCap}
          whitelisted={whitelisted}
          buyDayl={buyDayl}
          withdraw={withdraw}
          claim={claim}
        />
        <Info addDaylToken={addDaylToken} />
      </div>

      <Icon
        imgsrc={LogoMascot}
        classnamestyle="hero--mascot aic hover-effect"
      />
      <div className="hero--button-presale aic">
        Apply for Exclusive Pre-Sale Whitelist
      </div>
    </div>
  );
};

export default HeroSection;
