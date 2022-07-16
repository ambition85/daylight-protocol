import React from "react";

import crossChainBig from "../../assets/img/brand/crossChainBig.svg";
import crossChainSmall from "../../assets/img/brand/crossChainSmall.svg";
import crossChainExtraSmall from "../../assets/img/brand/crossChainExtraSmall.svg";
import "./style.css";
import Icon from "../../components/Icon";

const Road = () => {
  return (
    <div className="roadsection2-container aic" id="daylight">
      <Icon
        imgsrc={crossChainBig}
        classnamestyle="roadsection2--img-big aic "
      />
      <Icon
        imgsrc={crossChainSmall}
        classnamestyle="roadsection2--img-small aic "
      />
      <Icon
        imgsrc={crossChainExtraSmall}
        classnamestyle="roadsection2--img-extra-small aic "
      />
    </div>
  );
};

export default Road;
