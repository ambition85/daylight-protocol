import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Big from "big.js";

import "./style.css";
import Icon from "../../../../components/Icon";
import ArrowLeftIcon from "../../../../assets/img/icons/arrowLeft.svg";
import busdIcon from "../../../../assets/img/coins/busd.svg";
import daylIcon from "../../../../assets/img/coins/dayl.svg";
import warningIcon from "../../../../assets/img/icons/warning.svg";
import switchIcon from "../../../../assets/img/icons/switch.svg";
import { localeString } from "../../../../utils/utils";
import { busdDecimals } from "../../../../Pages/Home";

const AddDaylModal = ({
  startTime,
  endTime,
  totalDayl,
  rate,
  busdBalance,
  whitelisted,
  onClose,
  buyDayl,
  minPerWallet,
  maxPerWallet,
}) => {
  const [isRange, setisRange] = useState(100);
  const [isBusdLow, setISBUSDLow] = useState(false);
  const [isMaxReached, setIsMaxReached] = useState(false);

  const [busdDepositNum, setBUSDDepositNum] = useState(0);
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(0);
  const [currentBUSDNum, setCurrentBUSDNum] = useState(0);
  const [maxInput, setMaxInput] = useState(0);

  const [isFormData, setisFormData] = useState({
    busdValue: "",
    daylValue: "",
  });

  useEffect(() => {
    const currentBUSDDeposit = Big(totalDayl)
      .div(Big(rate))
      .div(Big(10).pow(18))
      .toNumber();
    const minNum = Big(minPerWallet).div(Big(10).pow(18)).toNumber();
    const maxNum = Big(maxPerWallet).div(Big(10).pow(18)).toNumber();
    const currentBUSDNum = Big(busdBalance).div(Big(10).pow(18)).toNumber();
    setBUSDDepositNum(currentBUSDDeposit);
    setMinNum(minNum);
    setMaxNum(maxNum);
    setCurrentBUSDNum(currentBUSDNum);

    const max = Math.min(currentBUSDNum, maxNum - currentBUSDDeposit);
    setMaxInput(max);
    setisRange(((max * 100) / currentBUSDNum).toFixed(2));
    setisFormData({
      busdValue: max,
      daylValue: max * Big(rate),
      // daylValue: max * Big(rate).div(Big(10).pow(12))
    });

    if (currentBUSDNum === 0 || currentBUSDNum + currentBUSDDeposit < minNum)
      setISBUSDLow(true);
    if (currentBUSDDeposit >= maxNum) setIsMaxReached(true);
  }, []);

  const [isCurrent, setisCurrent] = useState("busd");
  const switchHandler = () => {
    setisCurrent((prev) => {
      return prev === "busd" ? "dayl" : "busd";
    });
  };

  const onChangeRange = (val) => {
    const maxRange = (maxInput * 100) / currentBUSDNum;
    if (maxRange < val) val = maxRange;

    const minRange = setisRange(Number(val).toFixed(2));
    const busdValue = ((val * currentBUSDNum) / 100).toFixed(2);
    const daylValue = busdValue * Big(rate);
    // const daylValue = busdValue * Big(rate).div(Big(10).pow(12))
    setisFormData({
      busdValue,
      daylValue,
    });
  };

  const onChangeHandler = (e) => {
    let { name, value } = e.target;

    if (value == 0) {
      setisFormData({
        busdValue: "",
        daylValue: "",
      });
      setisRange(0);
    } else if (name == "busdValue") {
      if (value > maxInput) value = maxInput;
      setisRange(((value / currentBUSDNum) * 100).toFixed(2));
      setisFormData({
        busdValue: value,
        daylValue: value * Big(rate),
        // daylValue: value * Big(rate).div(Big(10).pow(12))
      });
    } else {
      // const busdValue = Big(value).mul(Big(10).pow(12)).div(Big(rate)).toNumber()
      const busdValue = Big(value).div(Big(rate)).toNumber();
      if (busdValue > maxInput) value = maxInput;
      setisRange(((busdValue / currentBUSDNum) * 100).toFixed(2));
      setisFormData({
        busdValue,
        daylValue: value,
      });
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { busdValue, daylValue } = isFormData;
    if (!busdValue || !daylValue) {
      toast.error("Please fill all fields");
      return;
    }
    const busdValueBig = Big(busdValue);
    const daylValueBig = Big(daylValue);
    if (busdValueBig.gt(busdBalance)) {
      toast.error("You don't have enough busd");
      return;
    }
    if (daylValueBig.gt(totalDayl)) {
      toast.error("You don't have enough dayl");
      return;
    }
    // buyDayl(busdValueBig, daylValueBig);
  };

  const addDayl = async () => {
    if (!whitelisted) {
      toast.error("You are not whitelisted");
    } else if (Date.now() / 1000 < startTime) {
      toast.error("Presale not started");
    } else if (Date.now() / 1000 > endTime) {
      toast.error("Presale ended");
    } else {
      if (busdBalance.toString() === "0" || isRange === "0") {
        toast.error("Buying 0 $DAYL");
      } else {
        await buyDayl(
          (isFormData.busdValue * Math.pow(10, busdDecimals)).toString()
        );
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
          <>My ${isCurrent === "busd" ? "BUSD" : "DAYL"}</>
          <Icon
            style={{ width: "25px", height: "25px" }}
            imgsrc={isCurrent === "busd" ? busdIcon : daylIcon}
            classnamestyle="hover-effect adddaylmodal--infostack-a-info-token aic"
          />
          <b>
            {isCurrent === "busd"
              ? localeString(new Big(busdBalance).div(new Big(10).pow(18)))
              : localeString(
                  new Big(busdBalance)
                    .mul(new Big(rate))
                    .div(new Big(10).pow(18))
                )}
          </b>
        </div>
        <div className="adddaylmodal--infostack-a-amount">
          Amount {isRange}%
        </div>
      </div>
      {isBusdLow && (
        <div
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
              BUSD Balance Low.
            </div>
            <div className=" profilemodal--box-warning-bottom">
              You need a minimum of 100 $BUSD to purchase PreSale tokens.
            </div>
          </div>
        </div>
      )}
      {isMaxReached && (
        <div
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
        </div>
      )}
      {!isMaxReached && !isBusdLow && (
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
              onClick={() => onChangeRange((minNum * 100) / currentBUSDNum)}
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
              onClick={() => onChangeRange((maxInput * 100) / currentBUSDNum)}
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
                name={isCurrent === "busd" ? "busdValue" : "daylValue"}
                value={
                  isCurrent === "busd"
                    ? isFormData.busdValue
                    : isFormData.daylValue
                }
                onChange={(e) => onChangeHandler(e)}
                aria-disabled={false}
                placeholder={
                  isCurrent === "busd" ? "Add BUSD Tokens" : "Add DAYL Tokens"
                }
                step={0.001}
                required
                min={0}
                pattern="\d*"
              />
              {/* <div className="adddaylmodal--tokens-token-amount">
            {isCurrent === "busd"
              ? localeString(
                  new Big(busdBalance)
                    .mul(isRange)
                    .div(100)
                    .div(new Big(10).pow(18))
                )
              : localeString(
                  new Big(busdBalance)
                    .mul(new Big(rate))
                    .mul(isRange)
                    .div(100)
                    .div(new Big(10).pow(18))
                ).toString()}
          </div> */}
              <div className="adddaylmodal--tokens-token-img aic">
                <Icon
                  style={{ width: "25px", height: "25px" }}
                  imgsrc={isCurrent === "busd" ? busdIcon : daylIcon}
                  classnamestyle="hover-effect adddaylmodal--tokens-token-img-icon aic"
                />
                {isCurrent === "busd" ? "BUSD" : "DAYL"}
              </div>
            </div>
            <div
              className="adddaylmodal--tokens-token-switch"
              // onClick={() => switchHandler()}
              data-aos="fade-down"
              data-aos-delay="400"
              data-aos-offset="-200"
              data-aos-easing="ease-in-out"
            >
              <Icon
                imgsrc={switchIcon}
                style={{ width: "25px", height: "25px" }}
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
                name={isCurrent !== "busd" ? "busdValue" : "daylValue"}
                value={
                  isCurrent !== "busd"
                    ? isFormData.busdValue
                    : isFormData.daylValue
                }
                placeholder={
                  isCurrent === "busd" ? "Add BUSD Tokens" : "Add DAYL Tokens"
                }
                onChange={(e) => onChangeHandler(e)}
                aria-disabled={false}
                step={0.001}
                required
                min={0}
                pattern="\d*"
              />
              {/* {isCurrent === "busd"
              ? localeString(
                  new Big(busdBalance)
                    .mul(new Big(rate))
                    .mul(isRange)
                    .div(100)
                    .div(new Big(10).pow(18))
                ).toString()
              : localeString(
                  new Big(busdBalance)
                    .mul(isRange)
                    .div(100)
                    .div(new Big(10).pow(18))
                )}
          </div> */}
              <div className="adddaylmodal--tokens-token-img aic">
                <Icon
                  style={{ width: "25px", height: "25px" }}
                  imgsrc={isCurrent === "busd" ? daylIcon : busdIcon}
                  classnamestyle="hover-effect adddaylmodal--tokens-token-img-icon aic"
                />
                {isCurrent === "busd" ? "DAYL" : "BUSD"}
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
      )}
    </div>
  );
};

export default AddDaylModal;
