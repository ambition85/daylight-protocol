import React from "react";
import Header from "../../components/Header";
import Sale from "./Sale";
import Info from "./Info";
import "./style.css";

const HeroSection = ({ rate, startTime, endTime, totalUsdc, totalDayl, usdcBalance, whitelisted, claimable, addDaylToken, buyDayl }) => {
  return (
    <div className="hero-container-header">
      <Header />
      <div className="hero-container">
        <Sale rate={rate} startTime={startTime} endTime={endTime} totalUsdc={totalUsdc} totalDayl={totalDayl} usdcBalance={usdcBalance} claimable={claimable} total={6000000} whitelisted={whitelisted} buyDayl={buyDayl} />
        <Info addDaylToken={addDaylToken} />
      </div>
    </div>
  );
};

export default HeroSection;
