import React from "react";
import Icon from "../../components/Icon";

const BulletPoint = ({ img, title, desc }) => {
  return (
    <div className="bulletpoint-container">
      <Icon imgsrc={img} classnamestyle="bulletpoint--img hover-effect aic" />
      <div className="bulletpoint--info">
        <div className="bulletpoint--info-title">{title}</div>
        <div className="bulletpoint--info-description">{desc}</div>
      </div>
    </div>
  );
};

export default BulletPoint;
