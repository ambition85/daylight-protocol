import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Big from "big.js";

import "./style.css";
import Icon from "../../../../components/Icon";
import ArrowLeftIcon from "../../../../assets/img/icons/arrowLeft.svg";
import usdcIcon from "../../../../assets/img/coins/usdc.svg";
import daylIcon from "../../../../assets/img/coins/dayl.svg";
import warningIcon from "../../../../assets/img/icons/warning.svg";
import switchIcon from "../../../../assets/img/icons/switch.svg";
import { localeString } from "../../../../utils/utils";
import { usdcDecimals } from "../../../../Pages/Home";

const AddDaylModal = ({
  startTime,
  endTime,
  totalDayl,
  rate,
  usdcBalance,
  whitelisted,
  onClose,
  buyDayl,
  minPerWallet,
  maxPerWallet,
}) => {
  const [isRange, setisRange] = useState(100);
  const [isUsdcLow, setISUSDCLow] = useState(false)
  const [isMaxReached, setIsMaxReached] = useState(false)

  const [usdcDepositNum, setUSDCDepositNum] = useState(0)
  const [minNum, setMinNum] = useState(0)
  const [maxNum, setMaxNum] = useState(0)
  const [currentUSDCNum, setCurrentUSDCNum] = useState(0)
  const [maxInput, setMaxInput] = useState(0)

  const [isFormData, setisFormData] = useState({
    usdcValue: "",
    daylValue: "",
  });

  useEffect(() => {
    const currentUSDCDeposit = Big(totalDayl).div(Big(rate)).div(Big(10).pow(6)).toNumber()
    const minNum = Big(minPerWallet).div(Big(10).pow(6)).toNumber()
    const maxNum = Big(maxPerWallet).div(Big(10).pow(6)).toNumber()
    const currentUSDCNum = Big(usdcBalance).div(Big(10).pow(6)).toNumber()
    setUSDCDepositNum(currentUSDCDeposit)
    setMinNum(minNum)
    setMaxNum(maxNum)
    setCurrentUSDCNum(currentUSDCNum)

    const max = Math.min(currentUSDCNum, maxNum - currentUSDCDeposit)
    setMaxInput(max)
    setisRange((max * 100 / currentUSDCNum).toFixed(2))
    setisFormData({
      usdcValue: max,
      daylValue: max * Big(rate).div(Big(10).pow(12))
    })

    if (currentUSDCNum === 0 || currentUSDCNum + currentUSDCDeposit < minNum) setISUSDCLow(true)
    if (currentUSDCDeposit >= maxNum) setIsMaxReached(true)
  }, [])

  const [isCurrent, setisCurrent] = useState("usdc");
  const switchHandler = () => {
    setisCurrent((prev) => {
      return prev === "usdc" ? "dayl" : "usdc";
    });
  };

  const onChangeRange = (val) => {
    const maxRange = maxInput * 100 / currentUSDCNum
    if (maxRange < val) val = maxRange

    setisRange(Number(val).toFixed(2))
    const usdcValue = (val * currentUSDCNum / 100).toFixed(2)
    const daylValue = usdcValue * Big(rate).div(Big(10).pow(12))
    setisFormData({
      usdcValue, daylValue
    })
  }

  const onChangeHandler = (e) => {
    let { name, value } = e.target;

    if (value == 0) {
      setisFormData({
        usdcValue: "",
        daylValue: ""
      })
      setisRange(0)
    }
    else if (name == "usdcValue") {
      if (value > maxInput) value = maxInput
      setisRange((value / currentUSDCNum * 100).toFixed(2))
      setisFormData({
        usdcValue: value,
        daylValue: value * Big(rate).div(Big(10).pow(12))
      })
    }
    else {
      const usdcValue = Big(value).mul(Big(10).pow(12)).div(Big(rate)).toNumber()
      if (usdcValue > maxInput) value = maxInput
      setisRange((usdcValue / currentUSDCNum * 100).toFixed(2))
      setisFormData({
        usdcValue,
        daylValue: value
      })
    }
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
        await buyDayl(isFormData.usdcValue * Math.pow(10, usdcDecimals));
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
          {localeString(new Big(totalDayl).div(new Big(10).pow(18)).toFixed(2))}
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
      {isUsdcLow && <div
        className="profilemodal--box aic"
        style={{
          gap: "8px",
          margin: "16px 0px",
          padding: "10px 6px",
          border: "1px solid #DA4A52",
        }}
      >
        <Icon
          imgsrc={warningIcon}
          classnamestyle="profilemodal--box-warning-icon aic hover-effect"
        />
        <div className="aic profilemodal--box-warning">
          <div className=" profilemodal--box-warning-top">
            USDC Balance Low.
          </div>
          <div className=" profilemodal--box-warning-bottom">
            You need a minimum of 30 $USDC to purchase pre-sale tokens.
          </div>
        </div>
      </div>}
      {isMaxReached && <div
        className="profilemodal--box aic"
        style={{
          gap: "8px",
          margin: "16px 0px",
          padding: "10px 6px",
          border: "1px solid #DA4A52",
        }}
      >
        <Icon
          imgsrc={warningIcon}
          classnamestyle="profilemodal--box-warning-icon aic hover-effect"
        />
        <div className="aic profilemodal--box-warning">
          <div className=" profilemodal--box-warning-bottom">
            You have deposited max amount.
          </div>
        </div>
      </div>}
      {!isMaxReached && !isUsdcLow &&
        <div>
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
            onChange={(e) => onChangeRange(e.target.value)}
          />
          {/* /////////// */}
          <div className="adddaylmodal--buttons aic">
            <button
              className="adddaylmodal--buttons-button aic"
              type="button"
              onClick={() => onChangeRange((minNum * 100 / currentUSDCNum))}
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
              onClick={() => onChangeRange(50)}
              data-aos="fade-down"
              data-aos-delay="300"
              data-aos-offset="-100"
              data-aos-easing="ease-in-out"
            >
              50%
            </button>
            <button
              className="adddaylmodal--buttons-button aic"
              type="button"
              onClick={() => onChangeRange(75)}
              data-aos="fade-down"
              data-aos-delay="400"
              data-aos-offset="-100"
              data-aos-easing="ease-in-out"
            >
              75%
            </button>
            <button
              className="adddaylmodal--buttons-button aic"
              type="button"
              onClick={() => onChangeRange((maxInput * 100 / currentUSDCNum))}
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
              />
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
              {/* {isCurrent === "usdc"
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
      }

    </div>
  );
};

export default AddDaylModal;
