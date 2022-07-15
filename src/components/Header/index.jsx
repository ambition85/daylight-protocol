import React, { useContext, useState } from "react";
import { WalletWeb3Context } from "../../context/WalletWeb3Context";
//
import "./style.css";
//
import LogoBrand from "../../assets/img/brand/logo.svg";
import menuIcon from "../../assets/img/icons/menu.svg";
//
// import User from "../User";
import { shortenAddress } from "../../utils/utils";
import Menu from "./Menu";
import Icon from "../Icon";
import WalletMenu from "./Wallet";

const Header = () => {
  const { connectWallet, wallet, isWrongNetwork, updateNetworkWallet } =
    useContext(WalletWeb3Context);
  const [isOpen, setIsOpen] = useState(false);
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
        <div className="hover-effect header--link">Pre-Sale</div>
        <div className="hover-effect header--link">ORION DEX</div>
        <div className="hover-effect header--link">Sustainability</div>
        <div className="hover-effect header--link">Daylight Porotocol</div>
        <div className="hover-effect header--link">Blog</div>
      </div>

      <div onClick={() => web3ButtonHandler()} className="header--button aic">
        {!!wallet ? (
          <>
            {isWrongNetwork ? (
              "Wrong Network"
            ) : (
              <WalletMenu address={shortenAddress(wallet)} />
            )}
          </>
        ) : (
          "Connect Wallet"
        )}
      </div>
      <div className="header--menu">
        <button type="button" onClick={() => setIsOpen(() => true)}>
          <Icon
            imgsrc={menuIcon}
            classnamestyle="header--menu-icon hover-effect aic"
          />
        </button>
        <Menu isOpen={isOpen} close={() => setIsOpen(() => false)} />
      </div>
    </nav>
  );
};

export default Header;
