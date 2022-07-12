import React from "react";
import "./style.css";
import Button from "../../../components/Button";
import TelegramIcon from "../../../assets/img/icons/telegram.svg";
import DiscordIcon from "../../../assets/img/icons/discord.svg";
import TwitterIcon from "../../../assets/img/icons/twitter.svg";
import MediumIcon from "../../../assets/img/icons/medium.svg";

const Info = () => {
  return (
    <div className="hero-info-container">
      <div
        className="hero-info--title"
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-offset="-100"
        data-aos-easing="ease-in"
      >
        Dentralized Earning
        <br /> Built for Sustainability and Ecosystem Inclusion
      </div>
      <div
        className="hero-info--subtitle"
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-offset="-100"
        data-aos-easing="ease-in"
      >
        Daylight Protocol is a decentralized auto-staking ecosystem with
        incentivized extensions that has been strategically created to disrupt
        decentralized earning and propel freedom of financial limitations, while
        rewarding users for contributions to the ecosystem with an appreciated
        earning over time.
      </div>
      <Button
        data-aos="fade-down"
        data-aos-delay="400"
        data-aos-offset="-100"
        data-aos-easing="ease-in"
      >
        Add $DAYL to Metamask
      </Button>
      <div className="hero-info--socials">
        <div
          className="hero-info--socials-icon hover-effect aic"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        >
          <img src={MediumIcon} alt="social icon" />
        </div>
        <div
          className="hero-info--socials-icon hover-effect aic"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        >
          <img src={TelegramIcon} alt="social icon" />
        </div>
        <div
          className="hero-info--socials-icon hover-effect aic"
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        >
          <img src={DiscordIcon} alt="social icon" />
        </div>
        <div
          className="hero-info--socials-icon hover-effect aic"
          data-aos="fade-down"
          data-aos-delay="500"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        >
          <img src={TwitterIcon} alt="social icon" />
        </div>
      </div>
    </div>
  );
};

export default Info;
