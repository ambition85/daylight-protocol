import React from "react";
import "./style.css";
const Icon = (props) => {
  const { imgsrc, link, classnamestyle } = props;
  return (
    <a className={classnamestyle} href={link}>
      <img
        {...props}
        className="icon--img"
        src={imgsrc}
        alt="icon-alt"
        draggable="false"
        loading="lazy"
      />
    </a>
  );
};

export default Icon;
