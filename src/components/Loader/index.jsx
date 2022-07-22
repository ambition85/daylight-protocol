import React from "react";
import Icon from "../Icon";
import "./style.css";
import Logo from "../../assets//img//brand/logo.svg";
import logoMascot from "../../assets//img//brand/logoMascot.gif";
const Loader = () => {
  return (
    <div className="loader-container aic">
      <Icon imgsrc={Logo} classnamestyle="loader-icon aic" />
      <Icon imgsrc={logoMascot} classnamestyle="loader-icon aic" />
    </div>
  );
};

export default Loader;
