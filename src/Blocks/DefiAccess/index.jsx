import React from "react";
import "./style.css";
import Logo from "../../assets/img/brand/logoBig.svg";
import defiBg from "../../assets/img/brand/defiBg.svg";
import iconSmall from "../../assets/img/brand/iconSmall.svg";
import Icon from "../../components/Icon";
import FlamesLayer from "../../components/FlamesLayer";

const DefiAccess = ({ offsetY }) => {
  return (
    <>
      <div className="defiaccess-container" id="daylight">
        <div className="defiaccess--backgroung">
          <img
            src={defiBg}
            alt="defiBg"
            className="defiaccess--backgroung-img"
          />
        </div>
        <div className="defiaccess-container-inner">
          <div className="defiaccess--info">
            <div className="defiaccess--info-header aic">
              <Icon
                imgsrc={iconSmall}
                classnamestyle="defiaccess--info-header-icon aic hover-effect wave"
              />
              <div className="defiaccess--info-header-title">
                DAYLIGHT PROTOCOL
              </div>
            </div>
            <div className="defiaccess--info-title">
              Sustainable Wealth Generation
            </div>
            <div className="defiaccess--info-sub">
              Paving the way for DeFi wealth generation with inclusion,
              innovation, and sustainability.
            </div>
          </div>
          <div className="defiaccess-brand">
            <img
              src={Logo}
              alt="daylight brand"
              className="defiaccess-brand-img"
            />
          </div>
        </div>
      </div>
      <div style={{ transform: "translateY(400px)" }}>
        <FlamesLayer offsetY={offsetY} noRight />
      </div>
    </>
  );
};

export default DefiAccess;
