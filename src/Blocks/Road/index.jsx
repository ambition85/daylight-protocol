import React from "react";
import BulletPoint from "./BulletPoint";
import icon1 from "../../assets/img/icons/crossChainDex.svg";
import icon2 from "../../assets/img/icons/graph.svg";
import icon3 from "../../assets/img/icons/layer.svg";
import icon4 from "../../assets/img/icons/rocket.svg";
import crossChainBg from "../../assets/img/brand/crossChainBg.svg";
import "./style.css";

const Road = () => {
  return (
    <div className="roadsection-container">
      <img
        className="roadsection--img-icon"
        src={crossChainBg}
        alt="raod"
        loading="lazy"
        draggable="false"
      />
      <div className="roadsection--absolute">
        <div className="roadsection--absolute-fake" />
        <div className="roadsection--bulletpoints">
          <BulletPoint
            img={icon1}
            title="Cross-Chain Dex"
            desc={
              "Unparalleled DeFi access, high liquidity, low slippage and cross-chain swaps with the best exchange rates."
            }
          />
          <BulletPoint
            img={icon2}
            title="Conditional Orders"
            desc={
              "Central limit order book capabilities with the feel and functionality of a traditional exchange."
            }
          />
          <BulletPoint
            img={icon3}
            title="Liquidity & Staking Pools"
            desc={
              "Earn incentives by providing liquidity or staking single assets."
            }
          />
          <BulletPoint
            img={icon4}
            title="Launchpad"
            desc={
              "Earn incentives by providing liquidity or staking single assets."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Road;
