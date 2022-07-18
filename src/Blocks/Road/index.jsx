import React from "react";

import crossChainBig from "../../assets/img/brand/crossChainBig.svg";
import crossChainSmall from "../../assets/img/brand/crossChainSmall.svg";
import "./style.css";
import Icon from "../../components/Icon";

const Road = () => {
  return (
    <div className="roadsection2-container aic" id="sustainability">
      <Icon
        imgsrc={crossChainBig}
        classnamestyle="roadsection2--img-big aic "
      />
      <Icon
        imgsrc={crossChainSmall}
        classnamestyle="roadsection2--img-small aic "
      />
    </div>
  );
};

export default Road;
