import React from "react";
import "./style.css";
import Icon from "../../components/Icon";
import logoMascot from "../..//assets/img/brand/litepaper.svg";
const Litepaper = () => {
  return (
    <div className="aic litepaper-container">
      <Icon imgsrc={logoMascot} classnamestyle="litepaper-logo" />
      <div className="aic litepaper--info">
        <div className=" litepaper--info-title">Project Daylight</div>
        <a
          className="litepaper--button aic"
          target="_blank"
          href="https://daylight-protocol.gitbook.io/litepaper/"
          rel="noreferrer"
        >
          LITEPAPER
        </a>

      </div>
    </div>
  );
};

export default Litepaper;
