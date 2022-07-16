import React, { useContext, useState } from "react";
import { toast } from 'react-toastify'
import Countdown from "react-countdown"
import Big from 'big.js'

import { WalletWeb3Context } from "../../../context/WalletWeb3Context";
import "./style.css";
import logoToken from "../../../assets/img/brand/logoToken.svg";
import { localeString } from "../../../utils/utils";
import Modal from "../../../components/Modal";
import AddDaylModal from "./AddDaylModal";
import AddMoreDaylModal from "./AddMoreDaylModal";
import { numberWithCommas } from "../../../utils/utils";

const Sale = ({ totalWithdrawn, allowance, approve, state, rate, startTime, endTime, claimTime, totalUsdc, totalDayl, usdcBalance, total, whitelisted, claimable, hardCap, softCap, buyDayl, withdraw, claim }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isModalMoreDaylOpen, setisModalMoreDaylOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState("30px");
  const { connectWallet, wallet, isWrongNetwork } =
    useContext(WalletWeb3Context);
  React.useEffect(() => {
    setProgressPercent((totalUsdc / total) * 100 + "%");
  }, [totalUsdc]);
  const curTime = Math.floor(Date.now() / 1000)
  const showModal = () => {
    if (!wallet) {
      return toast.error('Connect your wallet')
    }
    setisModalOpen(() => true)
  }

  console.log("Alow here: ", allowance)

  return (
    <div className="hero-sale-container-outer">
      {/* //MODAL ON FIXED POSITION  */}
      <Modal visible={isModalOpen} onClose={() => setisModalOpen(false)}>
        <AddDaylModal startTime={startTime} endTime={endTime} totalDayl={totalDayl} totalUsdc={totalUsdc} usdcBalance={usdcBalance} rate={rate} whitelisted={whitelisted} onClose={() => setisModalOpen(false)} buyDayl={buyDayl} />
      </Modal>
      <Modal
        visible={isModalMoreDaylOpen}
        onClose={() => setisModalMoreDaylOpen(false)}
      >
        <AddMoreDaylModal onClose={() => setisModalMoreDaylOpen(false)} startTime={startTime} endTime={endTime} totalDayl={totalDayl} totalUsdc={totalUsdc} usdcBalance={usdcBalance} rate={rate} whitelisted={whitelisted} buyDayl={buyDayl} />
      </Modal>
      <div className="hero-sale-container">
        {/* //////////////// 1 */}
        <div className="hero-sale-section-a">
          <div className="hero-sale-section-brand">
            <div className="hero-sale-section-brand-logo hover-effect">
              <img
                src={logoToken}
                className="hero-sale-section-brand-img"
                alt="token brand daylight"
              />
            </div>
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
            <div className="hero-sale-section-price-amount">${new Big(1).mul(new Big(10).pow(12)).div(new Big(rate)).toString()}</div>
            <div className="hero-sale-section-price-estimated">{new Big(1).mul(new Big(10).pow(12)).div(new Big(rate)).toString()} $USDC</div>
          </div>
        </div>
        {/* //////////////// 2 */}
        <div className="hero-sale-section" style={{ marginTop: "16px" }}>
          <div
            className="hero-sale-section-price"
            style={{ alignItems: "flex-start" }}
          >
            <div className="hero-sale-section-price-title">Round 1</div>
            <div className="hero-sale-section-price-amount">{curTime < startTime ? 'PRE-SALE NOT STARTED' : (curTime < endTime ? 'PRE-SALE' : 'PRE-SALE ENDED')}</div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">Time left</div>
            <div className="hero-sale-section-price-amount">
              {
                curTime < startTime ? 'PRE-SALE NOT STARTED' : (curTime < endTime ? <Countdown date={endTime * 1000} renderer={({ hours, minutes, seconds, completed }) => `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`} /> : 'PRE-SALE ENDED')
              }
            </div>
          </div>
        </div>
        {/* //////////////// 3 */}
        <div className="hero-sale-section-b" style={{ marginTop: "8px" }}>
          <div className="hero-sale-section-nametags">Sale</div>
        </div>

        {/* //////////////// 3 */}
        <div className="hero-sale-bar ">
          <div
            className="hero-sale-bar-circle hover-effect "
            style={{ width: progressPercent }}
          />
        </div>
        <div className="hero-sale-bar-value aic">
          <div className="hover-effect">{localeString(totalUsdc)}</div>/
          <div className="hover-effect">{localeString(total)}</div>
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
              ${numberWithCommas(hardCap / 1e6 * 40)} $DAYL
            </div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">
              Total Raised (Hard Cap)
            </div>
            <div className="hero-sale-section-price-amount">
              ${numberWithCommas(totalUsdc)} / ${numberWithCommas(hardCap / 1e6)}
            </div>
          </div>
        </div>
        {/* //////////////// connected */}
        {!!wallet && (
          <>
            <div className="hero-sale-section" style={{ marginTop: "32px" }}>
              <div className="hero-sale-section-connected-a">My Info</div>
              <div className="hero-sale-section-connected-b aic">
                Connected <div className="hero-sale-section-connected-status" />
              </div>
            </div>
            <div className="hero-sale-section" style={{ marginTop: "32px" }}>
              <div className="hero-sale-section-connected-b">
                My USDC deposit
              </div>
              <div className="hero-sale-section-connected-b">
                My Total Distribution
              </div>
              <div className="hero-sale-section-connected-b">
                My Total Withdrawn
              </div>
            </div>
            <div className="hero-sale-section" style={{ marginTop: "16px" }}>
              <div className="hero-sale-section-connected-a">${localeString(Big(totalDayl).div(Big(rate)).div(Big(10).pow(6)).toString())}</div>
              <div className="hero-sale-section-connected-a">{localeString(Big(totalDayl).div(Big(10).pow(18)).toString())} $DAYL</div>
              <div className="hero-sale-section-connected-a">{localeString(Big(totalWithdrawn).div(Big(10).pow(18)).toString())} $DAYL</div>
            </div>
            <div className="hero-sale-section-connected-divider" />
          </>
        )}
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
            <div className="hero-sale-section" style={{ width: "60%" }}>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">Claimable</div>
                <div className="hero-sale-section-connected-a">
                  {localeString(Big(claimable).div(Big(10).pow(18)).toNumber().toString())} $DAYL
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
                  {
                    curTime < claimTime ? <Countdown date={claimTime * 1000} renderer={({ hours, minutes, seconds, completed }) => hours >= 24 ? `${hours / 24} days` : (hours > 0 ? `${hours} hours` : (minutes > 0 ? `${minutes} minutes` : `${seconds} seconds`))} /> : ''
                  }
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
                  {localeString(Big(claimable).div(Big(10).pow(18)).toNumber().toString())} $DAYL
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
                  {
                    curTime < claimTime ? <Countdown date={claimTime * 1000} renderer={({ hours, minutes, seconds, completed }) => hours >= 24 ? `${hours / 24} days` : (hours > 0 ? `${hours} hours` : (minutes > 0 ? `${minutes} minutes` : `${seconds} seconds`))} /> : ''
                  }
                </div>
              </div>
            </div>
            {/* //HERO BUTTON FOR CLAIM  */}
            <button
              className="hero-sale-section-button"
              disabled
            >
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
            <div className="hero-sale-section" style={{ width: "60%" }}>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">Pre-Sale</div>
                <div
                  className={`hero-sale-section-connected-a ${Big(totalUsdc).gte(Big(softCap).div(Big(10).pow(6))) ? "connected-success" : "connected-failed"
                    }`}
                >
                  {Big(totalUsdc).gte(Big(softCap).div(Big(10).pow(6))) ? 'SUCCESS' : 'FAILED'}
                </div>
              </div>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">
                  Withdrawable
                </div>
                <div className="hero-sale-section-connected-a">${totalUsdc} USDC</div>
              </div>
            </div>
            {/* //HERO BUTTON FOR CLAIM  */}
            <button
              className="hero-sale-section-button"
              onClick={() => withdraw()}
            >
              Withdraw
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;