import React from "react";
import "./style.css";
import Lottie from "lottie-react";
import flames from "../..//assets/animations/flames.json";
// import flamesLeft from "../../assets/img/brand/flamesLeft.png";
// import flamesRight from "../../assets/img/brand/flamesRight.png";

const FlamesLayer = ({ offsetY, noLeft, noRight }) => {
  return (
    <div className="flameslayer-container">
      {!noLeft && (
        <div
          className="flameslayer-container-left"
          style={{
            transform: `translateY(-${offsetY * 0.5}px)`,
            transition: "transform 0.6s cubic-bezier(0, 0, 0, 1) 0s",
          }}
        >
          <Lottie animationData={flames} loop={true} />
          {/* <img
            className="icon--img"
            src={flamesLeft}
            alt="icon-alt"
            draggable="false"
          /> */}
        </div>
      )}
      {!noRight && (
        <div
          className="flameslayer-container-right"
          style={{
            transform: `translateY(-${offsetY * 0.4}px)`,
            transition: "transform 0.6s cubic-bezier(0, 0, 0, 1) 0s",
          }}
        >
          <Lottie animationData={flames} loop={true} />
          {/* <img
            className="icon--img"
            src={flamesRight}
            alt="icon-alt"
            draggable="false"
          /> */}
        </div>
      )}
    </div>
  );
};

export default FlamesLayer;
