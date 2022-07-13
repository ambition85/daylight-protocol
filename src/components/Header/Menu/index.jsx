import React from "react";
import "./style.css";
import Icon from "..//../Icon";
import LogoBrand from "../..//..//assets/img/brand/logo.svg";
import MediumIcon from "../../../assets/img/icons/medium.svg";
import TelegramIcon from "../../../assets/img/icons/telegram.svg";
import DiscordIcon from "../../../assets/img/icons/discord.svg";
import TwitterIcon from "../../../assets/img/icons/twitter.svg";

const Menu = ({ isOpen, close }) => {
  return (
    <div
      className={
        isOpen ? "menu-container-open aic" : "menu-container-close aic"
      }
    >
      <div className="menu--close" onClick={() => close()}>
        <Icon imgsrc={""} classnamestyle="menu--" />
      </div>
      <Icon imgsrc={LogoBrand} classnamestyle="menu--" />

      <div className="menu--links aic">
        <div className="menu--links-link hover-effect">Our Vision</div>
        <div className="menu--links-link hover-effect">Mechanics</div>
        <div className="menu--links-link hover-effect">Tokenomics</div>
        <div className="menu--links-link hover-effect">blog</div>
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
            link="https://discord.gg/dbkSDvS9Hd"
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
