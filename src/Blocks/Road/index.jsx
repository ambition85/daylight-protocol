import React from "react";
import BulletPoint from "./BulletPoint";
import icon1 from "../../assets/img/icons/crossChainDex.svg";
import icon2 from "../../assets/img/icons/graph.svg";
import icon3 from "../../assets/img/icons/layer.svg";
import icon4 from "../../assets/img/icons/rocket.svg";
import crossChainBg from "../../assets/img/brand/crossChainBg.png";
import "./style.css";
import Icon from "../../components/Icon";

const Road = () => {
  return (
    <div className="roadsection-container aic">
      <Icon
        imgsrc={crossChainBg}
        classnamestyle="roadsection--img-icon aic hover-effect"
      />

      <div className="roadsection--fake aic">
        <div className="roadsection--bulletpoints">
          <BulletPoint
            img={icon1}
            title="Extreme Utility"
            desc={
              "Daylight’s Utility is far beyond anything an autostaking token has accomplished, with redefined purpose, fair earning opportunities, and supporting sub-protocols in the Daylight ecosystem."
            }
          />
          <BulletPoint
            img={icon2}
            title="Conditional Orders"
            desc={
              "Daylight is focused on asset appreciation through a selective and high auto-staking APY, giving it a competitive placement in DeFi 3,0, while providing real ecosystem aspects that showcase inclusivity and extendability."
            }
          />
          <BulletPoint
            img={icon3}
            title="Asset and Ecosystem Appreciation"
            desc={
              "Daylight is focused on asset appreciation through a selective and high auto-staking APY, giving it a competitive placement in DeFi 3,0, while providing real ecosystem aspects that showcase inclusivity and extendability."
            }
          />
          <BulletPoint
            img={icon4}
            title="Superior Liquidity and Sustainability"
            desc={
              "Daylight and the team behind the protocol are on a mission to expand decentralized finance horizons by discovering and building the most versatile and inclusive protocol in the ecosystem to contribute to sustainable and collective wealth generation. DeFi is limitless, and we are here to drive harmony between TradFi & DeFi through research, development, and execution. "
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Road;
