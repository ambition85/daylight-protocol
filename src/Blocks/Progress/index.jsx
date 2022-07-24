import React from "react";
import Option from "./Option";
import "./style.css";

const ProgressSecction = () => {
  return (
    <div className="progress-container ">
      <Option check title="Whitelist Registration" date="25th July, 2022" />
      <Option check title="Whitelist Concluded" date="To Be Announced" />
      <Option check title="Presale Round 1" date="14th August, 2022" />
      <Option
        check
        title="Presale Conclusion & Token Distribution"
        date="To Be Announced"
      />
      <Option check title="Launch & IDO" date="To Be Announced" />
    </div>
  );
};

export default ProgressSecction;
