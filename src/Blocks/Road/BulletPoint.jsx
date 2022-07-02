import React from "react";

const BulletPoint = ({ img, title, desc }) => {
  return (
    <div className="bulletpoint-container">
      <div className="bulletpoint--img">
        <img src={img} alt="option" loading="lazy" draggable="false" />
      </div>
      <div className="bulletpoint--info">
        <div className="bulletpoint--info-title">{title}</div>
        <div className="bulletpoint--info-description">{desc}</div>
      </div>
    </div>
  );
};

export default BulletPoint;
