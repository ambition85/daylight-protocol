import React, { useContext } from "react";
import { WalletWeb3Context } from "../../context/WalletWeb3Context";
//
import "./style.css";
//
import LogoBrand from "../../assets/img/brand/logo.svg";
//
import Button from "../Button";
import User from "../User";
import { shortenAddress } from "../../utils/utils";

const Header = () => {
  const { connectWallet, wallet } = useContext(WalletWeb3Context);
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
        <Button onclick={() => connectWallet()}>
          {!!wallet ? shortenAddress(wallet) : "Connect Wallet"}
        </Button>
        <User />
      </div>
    </nav>
  );
};

export default Header;
