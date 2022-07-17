import React from "react";
import "./style.css";
import FlamesLayer from "../../components/FlamesLayer";

const BlockText = ({ offsetY }) => {
  return (
    <>
      <div className="blocktext-container aic">
        Paving the way for DeFi wealth generation with inclusion, innovation,
        and sustainability.
      </div>
      <div style={{ transform: "translateY(400px)" }}>
        <FlamesLayer offsetY={offsetY} noLeft />
      </div>
    </>
  );
};

export default BlockText;
