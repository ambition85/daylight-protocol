import React from "react";
import "./style.css";
import chain1 from "../..//assets//img//chains//bnb.svg";
import chain2 from "../..//assets//img//chains//eth.svg";
import chain3 from "../..//assets//img//chains//fantom.svg";
import chain4 from "../..//assets//img//chains//fantom2.svg";
import chain5 from "../..//assets//img//chains//fantom3.svg";
import ChainOption from "./ChainOption";

const ChainSection = () => {
  return (
    <div className="chains-container">
      <div className="chains--title">Cross Chain Interoperability</div>
      <div className="chains--options">
        <ChainOption img={chain1} title="BNB Chain" button="Coming Soon" />
        <ChainOption img={chain2} title="Ethereum" button="Coming Soon" />
        <ChainOption img={chain3} title="Fantom" button="Coming Soon" />
        <ChainOption img={chain4} title="Fantom" button="Coming Soon" />
        <ChainOption img={chain5} title="Fantom" button="Coming Soon" />
      </div>
    </div>
  );
};

export default ChainSection;
