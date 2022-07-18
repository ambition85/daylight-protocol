import React, { useContext, useState, useEffect } from "react";
import { WalletWeb3Context } from "../../context/WalletWeb3Context";
import { HashLink } from "react-router-hash-link";
//
import "./style.css";
//
import LogoBrand from "../../assets/img/brand/logo.svg";
import menuIcon from "../../assets/img/icons/menu.svg";
import walletIcon from "../../assets/img/icons/wallet.svg";
import downTabIcon from "../../assets/img/icons/downTab.svg";
//
import { shortenAddress } from "../../utils/utils";
import Menu from "./Menu";
import Icon from "../Icon";

const Header = ({ setisWalletOptionsOpen, offsetY }) => {
  const { connectWallet, wallet, isWrongNetwork, updateNetworkWallet } =
    useContext(WalletWeb3Context);
  const [isOpen, setIsOpen] = useState(false);
  const web3ButtonHandler = () => {
    if (isWrongNetwork) {
      updateNetworkWallet();
    } else {
      if (!!wallet) {
        setisWalletOptionsOpen((prev) => !prev);
      } else {
        setisWalletOptionsOpen(false);
        connectWallet();
      }
    }
  };

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollValue(e.target.documentElement.scrollTop);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollValue]);
  const scrollWithOffset = (el, offset) => {
    let elementPosition;
    if (offsetY === 0) {
      elementPosition = el.offsetTop - offset - 100;
    } else {
      elementPosition = el.offsetTop - offset;
    }
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className={
          scrollValue > 1
            ? "header-container-outer aic fixed-header"
            : "header-container-outer aic"
        }
      >
        <nav className="header-container">
          <Icon
            imgsrc={LogoBrand}
            href="/"
            classnamestyle="header--brand hover-effect aic"
          />

          <div className="header--links">
            <HashLink
              smooth={true}
              to="#presale"
              className="hover-effect header--link"
            >
              Pre-Sale
            </HashLink>
            <HashLink
              smooth={true}
              to="#daylight"
              scroll={(el) => scrollWithOffset(el, 100)}
              className="hover-effect header--link"
            >
              Daylight Protocol
            </HashLink>
            <HashLink
              smooth={true}
              to="#dex"
              className="hover-effect header--link"
            >
              DEX
            </HashLink>
            <HashLink
              smooth={true}
              to="#sustainability"
              className="hover-effect header--link"
            >
              Sustainability
            </HashLink>
            <HashLink
              smooth={true}
              to="#blog"
              className="hover-effect header--link"
            >
              Blog
            </HashLink>
          </div>
          <div className="header--buttons aic">
            <div className="aic">
              <div className="header--litepaper-left aic">Litepaper</div>
              <div className="header--litepaper-right aic">Website</div>
            </div>
            <div
              onClick={() => web3ButtonHandler()}
              className="header--button aic"
            >
              {!!wallet ? (
                <>
                  {isWrongNetwork ? (
                    "Wrong Network"
                  ) : (
                    <div className="walletmenu-container aic">
                      <Icon
                        imgsrc={walletIcon}
                        classnamestyle="walletmenu--icon-wallet aic "
                      />
                      {shortenAddress(wallet)}
                      <Icon
                        imgsrc={downTabIcon}
                        classnamestyle="walletmenu--icon-tab aic "
                      />
                    </div>
                  )}
                </>
              ) : (
                "Connect Wallet"
              )}
            </div>
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
      </div>
      <div onClick={() => web3ButtonHandler()} className="header--button2 aic">
        {!!wallet ? (
          <>
            {isWrongNetwork ? (
              "Wrong Network"
            ) : (
              <div className="walletmenu-container aic">
                <Icon
                  imgsrc={walletIcon}
                  classnamestyle="walletmenu--icon-wallet aic "
                />
                {shortenAddress(wallet)}
                <Icon
                  imgsrc={downTabIcon}
                  classnamestyle="walletmenu--icon-tab aic "
                />
              </div>
            )}
          </>
        ) : (
          "Connect Wallet"
        )}
      </div>
    </>
  );
};

export default Header;
