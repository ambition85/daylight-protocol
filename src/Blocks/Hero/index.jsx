import React from "react";
import Header from "../../components/Header";
import Sale from "./Sale";
import Info from "./Info";
import "./style.css";

const HeroSection = ({ totalWithdrawn, allowance, approve, state, rate, startTime, endTime, claimTime, totalUsdc, totalDayl, usdcBalance, whitelisted, claimable, hardCap, softCap, addDaylToken, buyDayl, withdraw, claim }) => {
  console.log("Allow: ", allowance)
  return (
    <div className="hero-container-header">
      <Header />
      <div className="hero-container">
        <Sale totalWithdrawn={totalWithdrawn} allowance={allowance} approve={approve} state={state} rate={rate} startTime={startTime} endTime={endTime} claimTime={claimTime} totalUsdc={totalUsdc} totalDayl={totalDayl} usdcBalance={usdcBalance} claimable={claimable} total={6000000} hardCap={hardCap} softCap={softCap} whitelisted={whitelisted} buyDayl={buyDayl} withdraw={withdraw} claim={claim} />
        <Info addDaylToken={addDaylToken} />
      </div>
    </div>
  );
};

export default HeroSection;
