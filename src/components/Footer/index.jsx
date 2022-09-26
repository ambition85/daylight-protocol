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
  const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="footer-container aic">
        <div className="footer--socials aic">
          <Icon
            imgsrc={mediumIcon}
            link="https://medium.com/@DaylightProtocol"
            classnamestyle="footer--social aic hover-effect"
          />
          <Icon
            imgsrc={discordIcon}
            link="https://discord.gg/CsRc6AVZbZ"
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
              PreSale
            </HashLink>
            <div className="footer--bottom-div" />
            <HashLink
              smooth={true}
              to="#daylight"
              scroll={(el) => scrollWithOffset(el, 100)}
              className="hover-effect footer--bottom-link"
            >
              Daylight Protocol
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
              to="#sustainability"
              scroll={(el) => scrollWithOffset(el, 100)}
              className="hover-effect footer--bottom-link"
            >
              Sustainability
            </HashLink>
          </div>
          <div className="footer--bottom-links2 aic ">
            <HashLink
              smooth={true}
              to="#presale"
              className="hover-effect footer--bottom-link"
            >
              PreSale
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
              to="#dex"
              className="hover-effect footer--bottom-link"
            >
              DEX
            </HashLink>
            <div className="footer--bottom-div" />
            <HashLink
              smooth={true}
              to="#sustainability"
              className="hover-effect footer--bottom-link"
            >
              Sustainability
            </HashLink>
          </div>
          <Icon
            imgsrc={LogoBrand}
            classnamestyle="footer--bottom-brand aic hover-effect"
          />
          <div className="footer--bottom-text">
            © {new Date().getFullYear()} Daylight Capital, All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
