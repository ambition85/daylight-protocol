import React from "react";
import Header from "../../components/Header";
import Sale from "./Sale";
import Info from "./Info";
import "./style.css";
// import Icon from "../../components/Icon";
// import Lottie from "lottie-react";
// import FenixFlying from "../../assets/animations/Fenix-Flying.json";
// import LogoMascot from "../../assets/img/brand/logoMascot.gif";
import FlamesLayer from "../../components/FlamesLayer";
// import { createPopup } from "@typeform/embed";
// import "@typeform/embed/build/css/popup.css";
const HeroSection = ({
  offsetY,
  setisWalletOptionsOpen,
  withdrawable,
  totalWithdrawn,
  allowance,
  approve,
  state,
  rate,
  startTime,
  endTime,
  claimTime,
  totalBusd,
  totalDayl,
  busdBalance,
  whitelisted,
  claimable,
  hardCap,
  softCap,
  addDaylToken,
  buyDayl,
  withdraw,
  claim,
  minPerWallet,
  maxPerWallet,
}) => {
  // const { toggle } = createPopup("ZweqBEDd");
  return (
    <div className="hero-container-header" id="presale">
      <Header
        setisWalletOptionsOpen={setisWalletOptionsOpen}
        offsetY={offsetY}
      />
      <div className="hero-container">
        <Sale
          withdrawable={withdrawable}
          totalWithdrawn={totalWithdrawn}
          allowance={allowance}
          approve={approve}
          state={state}
          rate={rate}
          startTime={startTime}
          endTime={endTime}
          claimTime={claimTime}
          totalBusd={totalBusd}
          totalDayl={totalDayl}
          busdBalance={busdBalance}
          claimable={claimable}
          hardCap={hardCap}
          softCap={softCap}
          whitelisted={whitelisted}
          buyDayl={buyDayl}
          withdraw={withdraw}
          claim={claim}
          minPerWallet={minPerWallet}
          maxPerWallet={maxPerWallet}
        />
        <Info addDaylToken={addDaylToken} />
      </div>
      {/* <div className="hero--footer aic">
        <div className="hero--mascot">
          <Lottie animationData={FenixFlying} loop={true} />
        </div>
        <div className="hero--footer-middle aic">
          <div className="hero--banner aic">
            Receive an EXCLUSIVE Whitelist for the Daylight Protocol PreSale
          </div>
          <div className="hero--button-presale aic" onClick={() => toggle()}>
            Apply Now
          </div>
        </div>
        <div className="hero--mascot  ">
          <Lottie animationData={FenixFlying} loop={true} />
        </div>
      </div> */}
      <FlamesLayer offsetY={offsetY} />
    </div>
  );
};

export default HeroSection;
