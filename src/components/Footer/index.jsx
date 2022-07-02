import React from "react";
import SectionList from "./SectionList";
import "./style.css";
//
import LogoBrand from "../../assets/img/brand/logo.svg";

const socialList = ["Medium", "Telegram", "Twitter", "Discord"];
const tokenList = ["Coingecko", "CoinmarketCap"];
const helplList = ["Status", "Brand Kit", "Terms of Service"];
const exchangesList = ["Status"];
const contractsList = ["Github", "Smart Contracts Audits"];
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer--top">
        <SectionList title="Social" list={socialList} />
        <SectionList title="Token" list={tokenList} />
        <SectionList title="Help" list={helplList} />
        <SectionList title="Exchanges" list={exchangesList} />
        <SectionList title="Smart Contracts" list={contractsList} />
      </div>
      <div className="footer--bottom">
        <div className="footer--bottom-brand">
          <img src={LogoBrand} alt="logo" draggable="false" loading="lazy" />
        </div>
        <div className="footer--bottom-text">
          Daylight Protocol Copyright {new Date().getFullYear()}. All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
