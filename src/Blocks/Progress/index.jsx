import React from "react";
import Option from "./Option";
import "./style.css";

const ProgressSecction = () => {
  return (
    <div className="progress-container ">
      <Option check title="Whitelist Registration" date="To be announced" />
      <Option check title="Whitelist Concluded" date="To be announced" />
      <Option check title="Presale Round 1" date="To be announced" />
      <Option
        check
        title="Presale Conclusion & Token Distribution"
        date="To be announced"
      />
      <Option title="Launch & IDO" date="To be announced" />
    </div>
  );
};

export default ProgressSecction;
