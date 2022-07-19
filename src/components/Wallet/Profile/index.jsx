import React, { useState, useEffect } from "react";
import "./style.css";
import Icon from "../../Icon";
import ArrowLeftIcon from "../../../assets/img/icons/arrowLeft.svg";
import frameIcon from "../../../assets/img/icons/frame.svg";
import warningIcon from "../../../assets/img/icons/warning.svg";
import copyIcon from "../../../assets/img/icons/copy.svg";
import daylIcon from "../../../assets/img/coins/dayl.svg";
import usdcIcon from "../../../assets/img/coins/usdc.svg";
import avaxIcon from "../../../assets/img/coins/avax.svg";
import { shortenAddressLong } from "../../../utils/utils";

const Profile = ({ wallet, onClose, disconnectWallet }) => {
  const [iscopyactive, setiscopyactive] = useState(false);
  useEffect(() => {
    if (iscopyactive) {
      const timer = setTimeout(() => {
        setiscopyactive(() => false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [iscopyactive]);
  const disconnectHandler = () => {
    disconnectWallet();
    onClose();
  };
  const copyClipboard = () => {
    setiscopyactive(() => true);
    navigator.clipboard.writeText(wallet);
  };
  return (
    <div
      className="profilemodal-container"
      data-aos="fade-down"
      data-aos-delay="200"
      data-aos-offset="-100"
      data-aos-easing="ease-in-out"
    >
      <div className="profilemodal--header aic">
        <div onClick={() => onClose()}>
          <Icon
            imgsrc={ArrowLeftIcon}
            classnamestyle="hover-effect profilemodal--header-back aic"
          />
        </div>
        Your Wallet
      </div>

      {/* /////////// */}
      <div className="profilemodal--wallet-info aic">
        <div className="profilemodal--wallet-info-title">Your Address</div>
        <div
          className="profilemodal--box aic"
          style={{ padding: "8px 20px", justifyContent: "space-between" }}
        >
          <div className="profilemodal--box-address">
            {shortenAddressLong(wallet)}
          </div>
          <div
            className="profilemodal--box-copy aic"
            onClick={() => copyClipboard()}
          >
            <div
              className={iscopyactive ? "message-copy-active" : "message-copy"}
            >
              Copied!
            </div>
            <Icon
              imgsrc={copyIcon}
              classnamestyle="profilemodal--box-copy-icon aic hover-effect"
            />
          </div>
        </div>
      </div>
      {/* /////////// */}
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
            USDC Balance Low.
          </div>
          <div className=" profilemodal--box-warning-bottom">
            You need USDC for Transactions fees.
          </div>
        </div>
      </div>

      {/* /////////// */}
      <div
        className="profilemodal--box aic"
        style={{ padding: "0px 16px", justifyContent: "space-between" }}
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-offset="-100"
        data-aos-easing="ease-in"
      >
        <div className="profilemodal--balance aic">
          <Icon
            imgsrc={daylIcon}
            classnamestyle="profilemodal--box-warning-icon aic hover-effect"
          />
          DAYL Balance
        </div>
        <div className="profilemodal--balance-amount">0.0</div>
      </div>
      <div
        className="profilemodal--box aic"
        style={{
          padding: "0px 16px",
          justifyContent: "space-between",
          marginTop: "7px",
        }}
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-offset="-100"
        data-aos-easing="ease-in"
      >
        <div className="profilemodal--balance aic">
          <Icon
            imgsrc={usdcIcon}
            classnamestyle="profilemodal--box-warning-icon aic hover-effect"
          />
          USDC Balance
        </div>
        <div className="profilemodal--balance-amount">0.0</div>
      </div>
      <div
        className="profilemodal--box aic"
        style={{
          padding: "0px 16px",
          justifyContent: "space-between",
          marginTop: "7px",
        }}
        data-aos="fade-down"
        data-aos-delay="400"
        data-aos-offset="-100"
        data-aos-easing="ease-in"
      >
        <div className="profilemodal--balance aic">
          <Icon
            imgsrc={avaxIcon}
            classnamestyle="profilemodal--box-warning-icon aic hover-effect"
          />
          AVAX Balance
        </div>
        <div className="profilemodal--balance-amount">0.0</div>
      </div>
      {/* /////////// */}
      <div
        className="profilemodal--scan aic "
        onClick={() => {
          window.open(`https://avascan.info/blockchain/c/address/${wallet}`);
        }}
      >
        View on AvaScan
        <Icon
          imgsrc={frameIcon}
          classnamestyle="profilemodal--box-warning-icon aic"
        />
      </div>
      {/* /////////// */}

      <button
        className="profilemodal--button aic"
        type="button"
        onClick={() => disconnectHandler()}
      >
        Disconnect Wallet
      </button>
    </div>
  );
};

export default Profile;
