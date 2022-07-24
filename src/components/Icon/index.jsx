import React from "react";
import "./style.css";
const Icon = (props) => {
  const { imgsrc, link, classnamestyle } = props;
  return (
    <a className={classnamestyle} target="_blank" href={link}>
      <img
        {...props}
        className="icon--img"
        src={imgsrc}
        alt="icon-alt"
        draggable="false"
      />
    </a>
  );
};

export default Icon;
