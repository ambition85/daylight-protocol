import React from "react";
import Option from "./Option";
import "./style.css";

const ProgressSecction = () => {
  return (
    <div className="progress-container ">
      <Option check title="REGISTRATION OPENS" date="To be announced" />
      {/* <Option check title="REGISTRATION CLOSES" date="July 1st 2022 16:00" />
      <Option check title="VALIDATOR ROUND" date="July 1st 2022 16:00" />
      <Option check title="STAKING ROUND" date="July 1st 2022 16:00" />
      <Option title="BOOSTER ROUND" date="July 1st 2022 16:00" />
      <Option title="z" date="July 1st 2022 16:00" /> */}
    </div>
  );
};

export default ProgressSecction;
