import React from "react";

const ChainOption = ({ img, title, button, onclick }) => {
  const buttonClickHandler = () => {
    if (!!onclick) {
      console.log("entro");
      onclick();
    }
  };

  return (
    <div className="chainoption-container">
      <div className="chainoption--img">
        <img src={img} alt="chain" draggable="false" loading="lazy" />
      </div>
      <div className="chainoption--title">{title}</div>
      <div className="chainoption--button" onClick={() => buttonClickHandler()}>
        {button}
      </div>
    </div>
  );
};

export default ChainOption;
