import React from "react";
//
import "./style.css";
//
import LogoBrand from "../../assets/img/brand/logo.svg";
//
import Button from "../Button";
import User from "../User";

const Header = () => {
  return (
    <nav className="header-container">
      <div className="header--brand">
        <img src={LogoBrand} alt="daylight protocol brand" />
      </div>
      <div className="header--links">
        <div className="header--link">Launchpad</div>
        <div className="header--link">Sales</div>
        <div className="header--link">Staking</div>
        <div className="header--link">Airdrops</div>
        <div className="header--link">Stats</div>
      </div>

      <div className="header--interaction">
        <Button>Connect Wallet</Button>
        <User />
      </div>
    </nav>
  );
};

export default Header;
