import React from "react";
import "./style.css";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import TelegramIcon from "../../../assets/img/icons/telegram.svg";
import DiscordIcon from "../../../assets/img/icons/discord.svg";
import TwitterIcon from "../../../assets/img/icons/twitter.svg";
import MediumIcon from "../../../assets/img/icons/medium.svg";

const Info = ({ addDaylToken }) => {
  return (
    <div className="hero-info-container">
      <div
        className="hero-info--title"
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-offset="-100"
        data-aos-easing="ease-in"
      >
        Built for Sustainability and Ecosystem Inclusion
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
        onClick={() => addDaylToken()}
      >
        Add PreSale Token to Wallet
      </Button>
      <div className="hero-info--socials">
        <Icon
          imgsrc={MediumIcon}
          link="https://medium.com/@DaylightProtocol"
          classnamestyle="hero-info--socials-icon aic hover-effect"
        />
        <Icon
          imgsrc={TelegramIcon}
          link="https://t.me/Daylightprotocol"
          classnamestyle="hero-info--socials-icon aic hover-effect"
        />
        <Icon
          imgsrc={DiscordIcon}
          link="https://discord.gg/CsRc6AVZbZ"
          classnamestyle="hero-info--socials-icon aic hover-effect"
        />
        <Icon
          imgsrc={TwitterIcon}
          link="https://twitter.com/DaylightDeFi"
          classnamestyle="hero-info--socials-icon aic hover-effect"
        />
      </div>
    </div>
  );
};

export default Info;
