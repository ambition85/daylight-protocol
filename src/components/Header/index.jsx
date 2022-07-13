import React, { useContext } from "react";
import { WalletWeb3Context } from "../../context/WalletWeb3Context";
//
import "./style.css";
//
import LogoBrand from "../../assets/img/brand/logo.svg";
//
import Button from "../Button";
// import User from "../User";
import { shortenAddress } from "../../utils/utils";

const Header = () => {
  const { connectWallet, wallet, isWrongNetwork, updateNetworkWallet } =
    useContext(WalletWeb3Context);

  const web3ButtonHandler = () => {
    if (isWrongNetwork) {
      updateNetworkWallet();
    } else {
      connectWallet();
    }
  };
  return (
    <nav className="header-container">
      <div className="header--brand">
        <img src={LogoBrand} alt="daylight protocol brand" />
      </div>
      <div className="header--links">
        <div className="hover-effect header--link">Launchpad</div>
        <div className="hover-effect header--link">Sales</div>
        <div className="hover-effect header--link">Staking</div>
        <div className="hover-effect header--link">Airdrops</div>
        <div className="hover-effect header--link">Stats</div>
      </div>

      <div className="header--interaction">
        <Button onClick={() => web3ButtonHandler()}>
          {!!wallet ? (
            <>{isWrongNetwork ? "Wrong Network" : shortenAddress(wallet)}</>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Header;
