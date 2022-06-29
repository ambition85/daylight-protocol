import React from "react";
import "./style.css";
import Button from "../../../components/Button";
import TelegramIcon from "../../../assets/img/icons/telegram.svg";
import DiscordIcon from "../../../assets/img/icons/discord.svg";

const Info = () => {
  return (
    <div className="hero-info-container">
      <div className="hero-info--title">
        Alternative reality NFT based RPG game built on Avalanche
      </div>
      <div className="hero-info--subtitle">
        We at Echtano have measures in place to ensure sustainability and
        credibility for the benefit of our investors. Making this an ideal and
        safe long-term investment.
      </div>
      <Button>Add DLP to Metamask</Button>
      <div className="hero-info--socials">
        <div className="hero-info--socials-icon aic">
          <img src={TelegramIcon} alt="social icon" />
        </div>
        <div className="hero-info--socials-icon aic">
          <img src={DiscordIcon} alt="social icon" />
        </div>
        <div className="hero-info--socials-icon aic">
          <img src={TelegramIcon} alt="social icon" />
        </div>
        <div className="hero-info--socials-icon aic">
          <img src={DiscordIcon} alt="social icon" />
        </div>
        <div className="hero-info--socials-icon aic">
          <img src={TelegramIcon} alt="social icon" />
        </div>
        <div className="hero-info--socials-icon aic">
          <img src={TelegramIcon} alt="social icon" />
        </div>
        <div className="hero-info--socials-icon aic">
          <img src={TelegramIcon} alt="social icon" />
        </div>
        <div className="hero-info--socials-icon aic">
          <img src={TelegramIcon} alt="social icon" />
        </div>
      </div>
    </div>
  );
};

export default Info;
