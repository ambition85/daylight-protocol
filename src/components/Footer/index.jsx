import React from "react";
import "./style.css";
import { HashLink } from "react-router-hash-link";

//
import LogoBrand from "../../assets/img/brand/logo.svg";
import mediumIcon from "../../assets/img/socials/medium.svg";
import discordIcon from "../../assets/img/socials/discord.svg";
import telegramIcon from "../../assets/img/socials/telegram.svg";
import twitterIcon from "../../assets/img/socials/twitter.svg";
import Icon from "../Icon";

const Footer = () => {
  return (
    <div className="footer-container aic">
      <div className="footer--socials aic">
        <Icon
          imgsrc={mediumIcon}
          link="https://medium.com/@DaylightProtocol"
          classnamestyle="footer--social aic hover-effect"
        />
        <Icon
          imgsrc={discordIcon}
          link="https://discord.gg/dbkSDvS9Hd"
          classnamestyle="footer--social aic hover-effect"
        />
        <Icon
          imgsrc={telegramIcon}
          link="https://t.me/Daylightprotocol"
          classnamestyle="footer--social aic hover-effect"
        />
        <Icon
          imgsrc={twitterIcon}
          link="https://twitter.com/DaylightDeFi"
          classnamestyle="footer--social aic hover-effect"
        />
      </div>
      <div className="footer--bottom aic">
        <div className="footer--bottom-links aic ">
          <HashLink
            smooth={true}
            to="#presale"
            className="hover-effect footer--bottom-link"
          >
            Pre-Sale
          </HashLink>
          <div className="footer--bottom-div" />
          <HashLink
            smooth={true}
            to="#sustainability"
            className="hover-effect footer--bottom-link"
          >
            Sustainability
          </HashLink>
          <div className="footer--bottom-div" />
          <HashLink
            smooth={true}
            to="#dex"
            className="hover-effect footer--bottom-link"
          >
            DEX
          </HashLink>
          <div className="footer--bottom-div" />

          <HashLink
            smooth={true}
            to="#daylight"
            className="hover-effect footer--bottom-link"
          >
            Daylight Protocol
          </HashLink>
          <div className="footer--bottom-div" />
          <HashLink
            smooth={true}
            to="#blog"
            className="hover-effect footer--bottom-link"
          >
            Blog
          </HashLink>
        </div>
        <Icon
          imgsrc={LogoBrand}
          classnamestyle="footer--bottom-brand aic hover-effect"
        />
        <div className="footer--bottom-text">
          Daylight Protocol Copyright {new Date().getFullYear()}. All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
