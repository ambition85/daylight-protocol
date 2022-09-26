import React, { useState, useEffect } from "react";
import { providers, Contract, BigNumber, utils } from "ethers";
import "./style.css";
import Icon from "../../Icon";
import ArrowLeftIcon from "../../../assets/img/icons/arrowLeft.svg";
import frameIcon from "../../../assets/img/icons/frame.svg";
import warningIcon from "../../../assets/img/icons/warning.svg";
import copyIcon from "../../../assets/img/icons/copy.svg";
import daylIcon from "../../../assets/img/coins/dayl.svg";
import busdIcon from "../../../assets/img/coins/busd.svg";
import bnbIcon from "../../../assets/img/coins/bnb.svg";
import { shortenAddressLong } from "../../../utils/utils";

import {
  PresaleAddress,
  PresaleTokenAddress,
  BUSDAddress,
} from "../../../constants";
import ERC20ABI from "../../../constants/abis/ERC20.json";
import PresaleABI from "../../../constants/abis/Presale.json";
import PresaleTokenABI from "../../../constants/abis/PresaleToken.json";

import { busdDecimals } from "../../../Pages/Home/index";
// import { testnetNetwork as chainConfig } from "../../../utils/constants"
import { mainnetNetwork as chainConfig } from "../../../utils/constants";

let provider,
  presaleReadContract,
  busdReadContract,
  presaleTokenContract,
  busdContract;

const Profile = ({ wallet, onClose, disconnectWallet }) => {
  const [iscopyactive, setiscopyactive] = useState(false);
  const [isBusdLow, setISBUSDLow] = useState(false);
  const [busdBal, setBUSDBal] = useState(0);
  const [daylBal, setDAYLBal] = useState(0);
  const [bnbBal, setBNBBal] = useState(0);
  const [minPer, setMinPer] = useState(0);
  console.log("Wallet: ", wallet);
  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    provider = new providers.JsonRpcProvider(chainConfig.rpcUrls[0]);
    presaleReadContract = new Contract(
      PresaleAddress,
      PresaleABI,
      new providers.JsonRpcProvider(chainConfig.rpcUrls[0])
    );
    presaleTokenContract = new Contract(
      PresaleTokenAddress,
      PresaleTokenABI,
      new providers.JsonRpcProvider(chainConfig.rpcUrls[0])
    );
    busdReadContract = new Contract(
      BUSDAddress,
      ERC20ABI,
      new providers.JsonRpcProvider(chainConfig.rpcUrls[0])
    );

    const [daylBal, busdBal, bnbBal, minPer] = await Promise.all([
      presaleTokenContract.balanceOf(wallet),
      busdReadContract.balanceOf(wallet),
      provider.getBalance(wallet),
      presaleReadContract.minPerWallet(),
    ]);
    console.log("Balance: ", daylBal, busdBal, bnbBal);
    setBNBBal(utils.formatEther(bnbBal));
    setDAYLBal(utils.formatEther(daylBal));
    setBUSDBal(utils.formatUnits(busdBal, busdDecimals));
    setMinPer(minPer.toString());

    if (minPer.gt(busdBal)) setISBUSDLow(true);
  };

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

      {/* /////////// */}
      <div
        className="profilemodal--box aic"
        style={{
          marginTop: "10px",
          padding: "0px 16px",
          justifyContent: "space-between",
        }}
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
        <div className="profilemodal--balance-amount">{daylBal}</div>
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
            imgsrc={busdIcon}
            classnamestyle="profilemodal--box-warning-icon aic hover-effect"
          />
          BUSD Balance
        </div>
        <div className="profilemodal--balance-amount">{busdBal}</div>
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
            imgsrc={bnbIcon}
            classnamestyle="profilemodal--box-warning-icon aic hover-effect"
          />
          BNB Balance
        </div>
        <div className="profilemodal--balance-amount">{bnbBal}</div>
      </div>
      {/* /////////// */}
      <div
        className="profilemodal--scan aic "
        onClick={() => {
          window.open(`https://bscscan.com/address/${wallet}`);
        }}
      >
        View on BSCScan
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
