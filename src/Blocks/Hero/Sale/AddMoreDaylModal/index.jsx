import React, { useState } from "react";
import { toast } from "react-toastify";
import Big from "big.js";

import "../AddDaylModal/style.css";
import Icon from "../../../../components/Icon";
import ArrowLeftIcon from "../../../../assets/img/icons/arrowLeft.svg";
import usdcIcon from "../../../../assets/img/coins/usdc.svg";
import daylIcon from "../../../../assets/img/coins/dayl.svg";
import switchIcon from "../../../../assets/img/icons/switch.svg";
import { localeString } from "../../../../utils/utils";

const AddMoreDaylModal = ({
  startTime,
  endTime,
  totalDayl,
  rate,
  usdcBalance,
  whitelisted,
  onClose,
  buyDayl,
}) => {
  const [isRange, setisRange] = useState(15);
  const [isFormData, setisFormData] = useState({
    usdcValue: "",
    daylValue: "",
  });
  const [isCurrent, setisCurrent] = useState("usdc");
  const switchHandler = () => {
    setisCurrent((prev) => {
      return prev === "usdc" ? "dayl" : "usdc";
    });
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setisFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { usdcValue, daylValue } = isFormData;
    if (!usdcValue || !daylValue) {
      toast.error("Please fill all fields");
      return;
    }
    const usdcValueBig = Big(usdcValue);
    const daylValueBig = Big(daylValue);
    if (usdcValueBig.gt(usdcBalance)) {
      toast.error("You don't have enough usdc");
      return;
    }
    if (daylValueBig.gt(totalDayl)) {
      toast.error("You don't have enough dayl");
      return;
    }
    // buyDayl(usdcValueBig, daylValueBig);
  };
  const addDayl = async () => {
    if (!whitelisted) {
      toast.error("You are not whitelisted");
    } else if (Date.now() / 1000 < startTime) {
      toast.error("Presale not started");
    } else if (Date.now() / 1000 > endTime) {
      toast.error("Presale ended");
    } else {
      if (usdcBalance.toString() === "0" || isRange === "0") {
        toast.error("Buying 0 $DAYL");
      } else {
        await buyDayl(isRange);
      }
    }
    onClose();
  };
  return (
    <div
      className="adddaylmodal-container"
      data-aos="fade-down"
      data-aos-delay="200"
      data-aos-offset="-100"
      data-aos-easing="ease-in-out"
    >
      <div className="adddaylmodal--header aic">
        <div onClick={() => onClose()}>
          <Icon
            imgsrc={ArrowLeftIcon}
            classnamestyle="hover-effect adddaylmodal--header-back aic"
          />
        </div>
        Purchase $DAYL
      </div>
      {/* /////////// */}
      <div className="adddaylmodal--current aic">
        <div>My current $DAYL Investment</div>
        <div className="adddaylmodal--current-b">
          {new Big(totalDayl).div(new Big(10).pow(18)).toFixed(2)}
        </div>
      </div>
      {/* /////////// */}
      <div className="adddaylmodal--infostack-a">
        <div className="adddaylmodal--infostack-a-info aic">
          <>My ${isCurrent === "usdc" ? "USDC" : "DAYL"}</>
          <Icon
            imgsrc={isCurrent === "usdc" ? usdcIcon : daylIcon}
            classnamestyle="hover-effect adddaylmodal--infostack-a-info-token aic"
          />
          <b>
            {isCurrent === "usdc"
              ? localeString(new Big(usdcBalance).div(new Big(10).pow(6)))
              : localeString(
                  new Big(usdcBalance)
                    .mul(new Big(rate))
                    .div(new Big(10).pow(18))
                )}
          </b>
        </div>
        <div className="adddaylmodal--infostack-a-amount">
          Amount {isRange}%
        </div>
      </div>
      <input
        style={{
          background: `linear-gradient(to right, #df725a 0%,#df725a ${isRange}%, #3C3D45 ${isRange}% , #3C3D45 100%)`,
          borderRadius: "20px",
          transition: "background 450ms ease-in",
        }}
        value={isRange}
        min="0"
        max="100"
        type="range"
        className="adddaylmodal--range"
        onChange={(e) => setisRange(e.target.value)}
      />
      {/* /////////// */}
      <div className="adddaylmodal--buttons aic">
        <button
          className="adddaylmodal--buttons-button aic"
          type="button"
          onClick={() => setisRange(() => 15)}
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        >
          MIN
        </button>

        <button
          className="adddaylmodal--buttons-button aic"
          type="button"
          onClick={() => setisRange(() => 100)}
          data-aos="fade-down"
          data-aos-delay="500"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        >
          MAX
        </button>
      </div>
      {/* /////////// */}
      <div className="adddaylmodal--tokens aic">
        <div
          className="adddaylmodal--tokens-token aic"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        >
          <input
            className="adddaylmodal--tokens-token-amount"
            type="number"
            name={isCurrent === "usdc" ? "usdcValue" : "daylValue"}
            value={
              isCurrent === "usdc" ? isFormData.usdcValue : isFormData.daylValue
            }
            onChange={(e) => onChangeHandler(e)}
            aria-disabled={false}
            placeholder={
              isCurrent === "usdc" ? "Add USDC Tokens" : "Add DAYL Tokens"
            }
            step={0.001}
            required
            min={0}
            pattern="\d*"
          />{" "}
          {/* <div className="adddaylmodal--tokens-token-amount">
            {isCurrent === "usdc"
              ? localeString(
                new Big(usdcBalance)
                  .mul(isRange)
                  .div(100)
                  .div(new Big(10).pow(6))
              )
              : localeString(
                new Big(usdcBalance)
                  .mul(new Big(rate))
                  .mul(isRange)
                  .div(100)
                  .div(new Big(10).pow(18))
              ).toString()}
          </div> */}
          <div className="adddaylmodal--tokens-token-img aic">
            <Icon
              imgsrc={isCurrent === "usdc" ? usdcIcon : daylIcon}
              classnamestyle="hover-effect adddaylmodal--tokens-token-img-icon aic"
            />
            {isCurrent === "usdc" ? "USDC" : "DAYL"}
          </div>
        </div>
        <div
          className="adddaylmodal--tokens-token-switch"
          onClick={() => switchHandler()}
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-offset="-200"
          data-aos-easing="ease-in-out"
        >
          <Icon
            imgsrc={switchIcon}
            classnamestyle="adddaylmodal--tokens-token-switch-icon aic"
          />
        </div>
        <div
          className="adddaylmodal--tokens-token aic"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-offset="-200"
          data-aos-easing="ease-in-out"
        >
          <input
            className="adddaylmodal--tokens-token-amount"
            type="number"
            name={isCurrent !== "usdc" ? "usdcValue" : "daylValue"}
            value={
              isCurrent !== "usdc" ? isFormData.usdcValue : isFormData.daylValue
            }
            placeholder={
              isCurrent === "usdc" ? "Add USDC Tokens" : "Add DAYL Tokens"
            }
            onChange={(e) => onChangeHandler(e)}
            aria-disabled={false}
            step={0.001}
            required
            min={0}
            pattern="\d*"
          />
          {/* <div className="adddaylmodal--tokens-token-amount">
            {isCurrent === "usdc"
              ? localeString(
                new Big(usdcBalance)
                  .mul(new Big(rate))
                  .mul(isRange)
                  .div(100)
                  .div(new Big(10).pow(18))
              ).toString()
              : localeString(
                new Big(usdcBalance)
                  .mul(isRange)
                  .div(100)
                  .div(new Big(10).pow(6))
              )}
          </div> */}
          <div className="adddaylmodal--tokens-token-img aic">
            <Icon
              imgsrc={isCurrent === "usdc" ? daylIcon : usdcIcon}
              classnamestyle="hover-effect adddaylmodal--tokens-token-img-icon aic"
            />
            {isCurrent === "usdc" ? "DAYL" : "USDC"}
          </div>
        </div>
      </div>
      <button
        className="adddaylmodal--button aic"
        type="button"
        onClick={() => addDayl()}
      >
        Purchase $DAYL
      </button>
    </div>
  );
};

export default AddMoreDaylModal;
