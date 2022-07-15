import React from "react";
import Header from "../../components/Header";
import Sale from "./Sale";
import Info from "./Info";
import "./style.css";

const HeroSection = ({
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
    <div className="hero-container-header">
      <Header />
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
    </div>
  );
};

export default HeroSection;
