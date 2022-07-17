import React from "react";
import Option from "./Option";
import "./style.css";

const ProgressSecction = () => {
  return (
    <div className="progress-container ">
      <Option check title="Whitelist Registration" date="To Be Announced" />
      <Option check title="Whitelist Concluded" date="To Be Announced" />
      <Option check title="Presale Round 1" date="To Be Announced" />
      <Option
        check
        title="Presale Conclusion & Token Distribution"
        date="To Be Announced"
      />
      <Option check title="Launch & IDO" date="To Be Announced" />
      <div id="daylight" className="daylight-workaround" />
    </div>
  );
};

export default ProgressSecction;
