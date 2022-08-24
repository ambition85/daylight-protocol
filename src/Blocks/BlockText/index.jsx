import React from "react";
import "./style.css";
// import FlamesLayer from "../../components/FlamesLayer";

const BlockText = ({ offsetY }) => {
  return (
    <>
      <div className="blocktext-container aic">
        $DAYL token is a deflationary BEP-20 token with an elastic supply that
        rewards holders with a positive rebase reward over time for just
        holding. $DAYL also has unique utilities that will be introduced in our
        ecosystem extensions, starting with Casa Daylight, a rewarding and
        game-based protocol which aims to decentralize online betting and
        chance-based earnings.
        <br />
        <br />
        $DAYL has implemented trading volume fees that contribute to further
        ecosystem development and price action sustainability.
        <br />
        <br /> Daylight was created with the intention to stabilize the DeFi 3.0
        space by ascertaining measures in place to mitigate price manipulation,
        depreciating value and combat sustainability issues faced by other
        protocols in the space.
      </div>
      {/* <div style={{ transform: "translateY(400px)" }}>
        <FlamesLayer offsetY={offsetY} noLeft />
      </div> */}
    </>
  );
};

export default BlockText;
