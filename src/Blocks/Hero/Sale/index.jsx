import React, { useContext, useState, useRef } from "react";

import Countdown from "react-countdown";
import Big from "big.js";

import { WalletWeb3Context } from "../../../context/WalletWeb3Context";
import "./style.css";
import logoToken from "../../../assets/img/coins/dayl.svg";
import Modal from "../../../components/Modal";
import Icon from "../../../components/Icon";
import AddDaylModal from "./AddDaylModal";
import AddMoreDaylModal from "./AddMoreDaylModal";
import {
  numberWithCommas,
  formatNumbers,
  localeString,
} from "../../../utils/utils";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import useAuth from "../../../hooks/useAuth";
import ConnectModal from "../../../components/ConnectModal";

const Sale = ({
  withdrawable,
  totalWithdrawn,
  allowance,
  approve,
  state,
  rate,
  startTime,
  endTime,
  claimTime,
  totalUsdc,
  totalDayl,
  usdcBalance,
  whitelisted,
  claimable,
  hardCap,
  softCap,
  buyDayl,
  withdraw,
  claim,
  minPerWallet,
  maxPerWallet,
}) => {
  const progressBarRef = useRef(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isModalMoreDaylOpen, setisModalMoreDaylOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState("30px");
  const [progressPercentSoftCap, setProgressPercentSoftCap] = useState("30px");
  const { account: wallet } = useActiveWeb3React()
  const { login } = useAuth()
  const [isOpenWallet, setisOpenWallet] = useState(false);

  React.useEffect(() => {
    let newValue = (totalUsdc / hardCap) * 1e6 * 100;
    let newValue2 =
      (((softCap / hardCap) * 100) / 100) * progressBarRef.current.clientWidth;
    setProgressPercentSoftCap(newValue2 + "px");
    if (newValue < 5) {
      newValue = "30px";
    } else {
      newValue = newValue + "%";
    }

    setProgressPercent(() => newValue);
  }, [totalUsdc, progressBarRef.current]);
  const curTime = Math.floor(Date.now() / 1000);

  const isMobile = window.innerWidth <= 768

  const handlePurchase = () => {
    console.log("Wallet: ".isMobile, window.innerWidth)
    if (isMobile) login("walletconnect")
    else {
      if (window.ethereum) login("injected")
      else setisOpenWallet(true)
    }
  }

  return (
    <div className="hero-sale-container-outer">
      {/* //MODAL ON FIXED POSITION  */}
      <Modal visible={isOpenWallet} onClose={() => setisOpenWallet(false)}>
        <ConnectModal login={login} onClose={() => setisOpenWallet(false)} />
      </Modal>

      <Modal visible={isModalOpen} onClose={() => setisModalOpen(false)}>
        <AddDaylModal
          startTime={startTime}
          endTime={endTime}
          totalDayl={totalDayl}
          totalUsdc={totalUsdc}
          usdcBalance={usdcBalance}
          minPerWallet={minPerWallet}
          maxPerWallet={maxPerWallet}
          rate={rate}
          whitelisted={whitelisted}
          onClose={() => setisModalOpen(false)}
          buyDayl={buyDayl}
        />
      </Modal>
      <Modal
        visible={isModalMoreDaylOpen}
        onClose={() => setisModalMoreDaylOpen(false)}
      >
        <AddMoreDaylModal
          onClose={() => setisModalMoreDaylOpen(false)}
          startTime={startTime}
          endTime={endTime}
          totalDayl={totalDayl}
          totalUsdc={totalUsdc}
          usdcBalance={usdcBalance}
          rate={rate}
          whitelisted={whitelisted}
          buyDayl={buyDayl}
        />
      </Modal>
      <div className="hero-sale-container">
        {/* //////////////// 1 */}
        <div className="hero-sale-section-a">
          <div className="hero-sale-section-brand">
            <Icon
              imgsrc={logoToken}
              classnamestyle="hero-sale-section-brand-logo hover-effect"
            />
            {/* <div className="hero-sale-section-brand-logo hover-effect">
              <img
                src={logoToken}
                className="hero-sale-section-brand-img"
                alt="token brand daylight"
              /> 
            </div>*/}
            <div className="hero-sale-section-brand-title">
              <div className="hero-sale-section-brand-title-name">
                Daylight Protocol
              </div>
              <div className="hero-sale-section-brand-title-name-small">
                $DAYL
              </div>
            </div>
          </div>
          <div className="hero-sale-section-price-a">
            <div className="hero-sale-section-price-title">Price</div>
            <div className="hero-sale-section-price-amount">
              $
              {new Big(1)
                .mul(new Big(10).pow(12))
                .div(new Big(rate))
                .toString()}
            </div>
            <div className="hero-sale-section-price-estimated">
              {new Big(1)
                .mul(new Big(10).pow(12))
                .div(new Big(rate))
                .toString()}{" "}
              $USDC
            </div>
          </div>
        </div>
        {/* //////////////// 2 */}
        <div className="hero-sale-section" style={{ marginTop: "16px" }}>
          <div
            className="hero-sale-section-price"
            style={{ alignItems: "flex-start" }}
          >
            <div className="hero-sale-section-price-title">Round 1</div>
            <div className="hero-sale-section-price-amount">
              {curTime < startTime
                ? "PRE-SALE NOT STARTED"
                : curTime < endTime
                  ? "PRE-SALE"
                  : "PRE-SALE ENDED"}
            </div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">Time left</div>
            <div className="hero-sale-section-price-amount">
              {/* {curTime < startTime ? (
                "PRE-SALE NOT STARTED"
              ) : curTime < endTime ? (
                <Countdown
                  date={endTime * 1000}
                  renderer={({ hours, minutes, seconds, completed }) =>
                    `${hours < 10 ? "0" : ""}${hours}:${
                      minutes < 10 ? "0" : ""
                    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
                  }
                />
              ) : (
                "PRE-SALE ENDED"
              )} */}
              TBD
            </div>
          </div>
        </div>
        {/* //////////////// 3 */}
        <div className="hero-sale-section-b" style={{ marginTop: "8px" }}>
          <div className="hero-sale-section-nametags">Sale</div>
        </div>

        {/* //////////////// 3 */}

        <div
          className="hero-sale-bar "
          ref={progressBarRef}
          style={{ marginTop: "16px" }}
        >
          <div
            className="hero-sale-bar-circle "
            style={
              progressPercent === "100%"
                ? { width: progressPercent, borderRadius: "20px" }
                : { width: progressPercent }
            }
          >
            <div
              className="hero-sale-bar-circle-indicator"
              style={{ left: progressPercentSoftCap }}
            >
              Soft Cap [$2.5M]
            </div>
            <div
              className="hero-sale-bar-circle-divider"
              style={{ left: progressPercentSoftCap }}
            />
          </div>
        </div>
        <div className="hero-sale-bar-value aic">
          <div className="hover-effect">{localeString(totalUsdc)}</div>/
          <div className="hover-effect">{localeString(hardCap / 1e6)}</div>
        </div>
        {/* //////////////// 4 */}
        <div className="hero-sale-section" style={{ marginTop: "27.32px" }}>
          <div
            className="hero-sale-section-price"
            style={{ alignItems: "flex-start" }}
          >
            <div className="hero-sale-section-price-title">
              Token Distribution
            </div>
            <div className="hero-sale-section-price-amount">
              ${numberWithCommas((hardCap / 1e6) * 40)} $DAYL
            </div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">
              Total Raised (Hard Cap)
            </div>
            <div className="hero-sale-section-price-amount">
              ${numberWithCommas(totalUsdc)} / $
              {numberWithCommas(hardCap / 1e6)}
            </div>
          </div>
        </div>
        {/* //////////////// connected */}
        {!!wallet ? (
          <>
            <div className="hero-sale-section" style={{ marginTop: "32px" }}>
              <div className="hero-sale-section-connected-a">My Info</div>
              <div className="hero-sale-section-connected-b aic">
                Connected <div className="hero-sale-section-connected-status" />
              </div>
            </div>
            <div className="hero-sale-section" style={{ marginTop: "32px" }}>
              <div
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <div className="hero-sale-section-connected-b">
                  My USDC deposit
                </div>
                <div className="hero-sale-section-connected-a">
                  $
                  {localeString(
                    Big(totalDayl).div(Big(rate)).div(Big(10).pow(6)).toString()
                  )}
                </div>
              </div>
              <div
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <div className="hero-sale-section-connected-b">
                  My Total Distribution
                </div>
                <div className="hero-sale-section-connected-a">
                  {localeString(Big(totalDayl).div(Big(10).pow(18)).toString())}{" "}
                  $DAYL
                </div>
              </div>
              <div
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div className="hero-sale-section-connected-b">
                  My Total Withdrawn
                </div>
                <div className="hero-sale-section-connected-a">
                  {localeString(
                    Big(totalWithdrawn).div(Big(10).pow(18)).toString()
                  )}{" "}
                  $DAYL
                </div>
              </div>
            </div>

            <div className="hero-sale-section-connected-divider" />
          </>
        ) : (
          <button
            className="hero-sale-section-purchase"
            onClick={handlePurchase}
          >
            Purchase Daylight Tokens
          </button>
        )}
        {/*
        //// so i can test manulay the modals
        <button
          className="hero-sale-section-button"
          onClick={() => setisModalOpen(() => true)}
        >
          Purchase $DAYL
        </button>
        <button
          className="hero-sale-section-button"
          onClick={() => setisModalMoreDaylOpen(() => true)}
        >
          Purchase $DAYL
        </button> */}
        {/* //////////////// add dayl normal */}
        {!!wallet && state == 1 && !allowance && (
          <div
            className="hero-sale-section"
            style={{
              marginTop: "27.32px",
              justifyContent: "flex-end",
            }}
          >
            {/* //HERO BUTTON FOR ADD  */}
            <button
              className="hero-sale-section-button"
              onClick={() => approve()}
            >
              Approve USDC
            </button>
          </div>
        )}
        {/* //////////////// add dayl normal */}
        {!!wallet && state == 1 && allowance && (
          <div
            className="hero-sale-section"
            style={{
              marginTop: "27.32px",
              justifyContent: "flex-end",
            }}
          >
            {/* //HERO BUTTON FOR ADD  */}
            <button
              className="hero-sale-section-button"
              onClick={() => setisModalOpen(() => true)}
            >
              Purchase $DAYL
            </button>
          </div>
        )}
        {/* //////////////// CLAIM */}
        {!!wallet && state == 3 && (
          <div
            className="hero-sale-section"
            style={{
              marginTop: "27.32px",
            }}
          >
            <div
              className="hero-sale-section"
              style={{ width: claimable.toString() === "0" ? "100%" : "60%" }}
            >
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">Claimable</div>
                <div className="hero-sale-section-connected-a">
                  {localeString(
                    Big(claimable).div(Big(10).pow(18)).toNumber().toString()
                  )}{" "}
                  $DAYL
                </div>
              </div>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">
                  Time to Unlock
                </div>
                <div className="hero-sale-section-connected-a">
                  {curTime < claimTime ? (
                    <Countdown
                      date={claimTime * 1000}
                      renderer={({ hours, minutes, seconds, completed }) =>
                        hours >= 24
                          ? `${hours / 24} days`
                          : hours > 0
                            ? `${hours} hours`
                            : minutes > 0
                              ? `${minutes} minutes`
                              : `${seconds} seconds`
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* //HERO BUTTON FOR CLAIM  */}
            <button
              className="hero-sale-section-button"
              disabled={curTime < claimTime || claimable == 0}
              onClick={() => claim()}
            >
              Claim
            </button>
          </div>
        )}

        {/* //////////////// CLAIM */}
        {!!wallet && state == 2 && (
          <div
            className="hero-sale-section"
            style={{
              marginTop: "27.32px",
            }}
          >
            <div className="hero-sale-section" style={{ width: "60%" }}>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">Claimable</div>
                <div className="hero-sale-section-connected-a">
                  {localeString(
                    Big(claimable).div(Big(10).pow(18)).toNumber().toString()
                  )}{" "}
                  $DAYL
                </div>
              </div>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">
                  Time to Unlock
                </div>
                <div className="hero-sale-section-connected-a">
                  {curTime < claimTime ? (
                    <Countdown
                      date={claimTime * 1000}
                      renderer={({ hours, minutes, seconds, completed }) =>
                        hours >= 24
                          ? `${hours / 24} days`
                          : hours > 0
                            ? `${hours} hours`
                            : minutes > 0
                              ? `${minutes} minutes`
                              : `${seconds} seconds`
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* //HERO BUTTON FOR CLAIM  */}
            <button className="hero-sale-section-button" disabled>
              Claim
            </button>
          </div>
        )}
        {/* //////////////// WITHDRAW */}
        {!!wallet && state == 4 && (
          <div
            className="hero-sale-section"
            style={{
              marginTop: "27.32px",
            }}
          >
            <div
              className="hero-sale-section"
              style={{
                width: withdrawable.toString() === "0" ? "100%" : "60^",
              }}
            >
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">Pre-Sale</div>
                <div
                  className={`hero-sale-section-connected-a ${Big(totalUsdc).gte(Big(softCap).div(Big(10).pow(6)))
                    ? "connected-success"
                    : "connected-failed"
                    }`}
                >
                  {Big(totalUsdc).gte(Big(softCap).div(Big(10).pow(6)))
                    ? "SUCCESS"
                    : "FAILED"}
                </div>
              </div>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">
                  Withdrawable
                </div>
                <div className="hero-sale-section-connected-a">
                  ${Big(withdrawable).div(Big(10).pow(6)).toFixed(1)} USDC
                </div>
              </div>
            </div>
            {/* //HERO BUTTON FOR CLAIM  */}
            {withdrawable.toString() !== "0" && (
              <button
                className="hero-sale-section-button"
                onClick={() => withdraw()}
              >
                Withdraw
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;
