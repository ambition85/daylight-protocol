import React from "react";
import Header from "../../components/Header";
import Sale from "./Sale";
import Info from "./Info";
import "./style.css";
import Icon from "../../components/Icon";
import LogoMascot from "../../assets/img/brand/logoMascot.gif";
import FlamesLayer from "../../components/FlamesLayer";

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
  totalUsdc,
  totalDayl,
  usdcBalance,
  whitelisted,
  claimable,
  hardCap,
  softCap,
  addDaylToken,
  buyDayl,
  withdraw,
  claim,
  minPerWallet,
  maxPerWallet
}) => {
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
          totalUsdc={totalUsdc}
          totalDayl={totalDayl}
          usdcBalance={usdcBalance}
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
      <div className="hero--footer aic">
        <Icon imgsrc={LogoMascot} classnamestyle="hero--mascot aic " />
        <div
          className="hero--button-presale aic"
          onClick={() => {
            window.open("https://ugensgmyg93.typeform.com/to/ZweqBEDd");
          }}
        >
          Apply Now
        </div>
        <div className="hero--banner aic">
          Receive an EXCLUSIVE Whitelist for the Daylight Protocol Pre-Sale
        </div>
      </div>
      <FlamesLayer offsetY={offsetY} />
    </div>
  );
};

export default HeroSection;
