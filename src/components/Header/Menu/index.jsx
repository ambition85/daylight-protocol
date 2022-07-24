import React from "react";
import "./style.css";
import Icon from "..//../Icon";
import arrowBack from "../../../assets/img/icons/arrowBack.svg";
import LogoBrand from "../..//..//assets/img/brand/logo.svg";
import MediumIcon from "../../../assets/img/icons/medium.svg";
import TelegramIcon from "../../../assets/img/icons/telegram.svg";
import DiscordIcon from "../../../assets/img/icons/discord.svg";
import TwitterIcon from "../../../assets/img/icons/twitter.svg";
import { HashLink } from "react-router-hash-link";

const Menu = ({ isOpen, close, buttonweb3 }) => {
  return (
    <div
      className={
        isOpen ? "menu-container-open aic" : "menu-container-close aic"
      }
    >
      <div className="menu--close" onClick={() => close()}>
        <Icon
          imgsrc={arrowBack}
          classnamestyle="menu--close-icon aic hover-effect"
        />
      </div>
      <Icon imgsrc={LogoBrand} classnamestyle="menu--" />

      <div className="menu--links aic">
        <HashLink
          onClick={() => close()}
          smooth={true}
          to="#presale"
          className="hover-effect menu--links-link"
        >
          Pre-Sale
        </HashLink>
        <HashLink
          onClick={() => close()}
          smooth={true}
          to="#daylight"
          className="hover-effect menu--links-link"
        >
          Daylight Protocol
        </HashLink>
        <HashLink
          onClick={() => close()}
          smooth={true}
          to="#dex"
          className="hover-effect menu--links-link"
        >
          DEX
        </HashLink>
        <HashLink
          onClick={() => close()}
          smooth={true}
          to="#sustainability"
          className="hover-effect menu--links-link"
        >
          Sustainability
        </HashLink>
        <HashLink
          onClick={() => close()}
          to="https://daylight-protocol.gitbook.io/litepaper/"
          className="hover-effect menu--links-link"
        >
          Litepaper
        </HashLink>
        <div
          className="hover-effect menu--links-link"
          style={{ opacity: "0.5" }}
        >
          website | coming soon
        </div>
        {buttonweb3}
      </div>
      <div className="menu--bottom aic">
        <div className="menu--socials aic">
          <Icon
            imgsrc={MediumIcon}
            link="https://medium.com/@DaylightProtocol"
            classnamestyle="menu--socials-social aic hover-effect"
          />
          <Icon
            imgsrc={TelegramIcon}
            link="https://t.me/Daylightprotocol"
            classnamestyle="menu--socials-social aic hover-effect"
          />
          <Icon
            imgsrc={DiscordIcon}
            link="https://discord.gg/wSagPDSfh3"
            classnamestyle="menu--socials-social aic hover-effect"
          />
          <Icon
            imgsrc={TwitterIcon}
            link="https://twitter.com/DaylightDeFi"
            classnamestyle="menu--socials-social aic hover-effect"
          />
        </div>
        <div className="menu--copyright">
          Daylight Protocol Copyright 2022. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Menu;
