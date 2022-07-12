import React, { useContext, useState } from "react";
import { WalletWeb3Context } from "../../../context/WalletWeb3Context";
import "./style.css";
import logoToken from "../../../assets/img/brand/logoToken.svg";
import { localeString } from "../../../utils/utils";
import Modal from "../../../components/Modal";
import AddDaylModal from "./AddDaylModal";
import AddMoreDaylModal from "./AddMoreDaylModal";

const Sale = ({ progress, total }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isModalMoreDaylOpen, setisModalMoreDaylOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState("30px");
  const { connectWallet, wallet, isWrongNetwork } =
    useContext(WalletWeb3Context);
  React.useEffect(() => {
    setProgressPercent((progress / total) * 100 + "%");
  }, [progress]);

  return (
    <div className="hero-sale-container-outer">
      {/* //MODAL ON FIXED POSITION  */}
      <Modal visible={isModalOpen} onClose={() => setisModalOpen(false)}>
        <AddDaylModal onClose={() => setisModalOpen(false)} />
      </Modal>
      <Modal
        visible={isModalMoreDaylOpen}
        onClose={() => setisModalMoreDaylOpen(false)}
      >
        <AddMoreDaylModal onClose={() => setisModalMoreDaylOpen(false)} />
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
            <div className="hero-sale-section-price-amount">$0.025</div>
            <div className="hero-sale-section-price-estimated">0.025 $USDC</div>
          </div>
        </div>
        {/* //////////////// 2 */}
        <div className="hero-sale-section" style={{ marginTop: "16px" }}>
          <div
            className="hero-sale-section-price"
            style={{ alignItems: "flex-start" }}
          >
            <div className="hero-sale-section-price-title">Round 1</div>
            <div className="hero-sale-section-price-amount">PRE-SALE</div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">Time left</div>
            <div className="hero-sale-section-price-amount">
              00:00:00 [Hours]
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
          <div className="hover-effect">{localeString(progress)}</div>/
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
              240,000,000 $DAYL
            </div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">
              Total Raised (Hard Cap)
            </div>
            <div className="hero-sale-section-price-amount">
              $0.0 / 6,000,000
            </div>
          </div>
        </div>
        {/* //////////////// connected */}
        {true && (
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
            </div>
            <div className="hero-sale-section" style={{ marginTop: "16px" }}>
              <div className="hero-sale-section-connected-a">$1,000</div>
              <div className="hero-sale-section-connected-a">40,000 $DAYL</div>
            </div>
            <div className="hero-sale-section-connected-divider" />
          </>
        )}
        {/* //////////////// add dayl normal */}
        {true && (
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
              Add $DAYL
            </button>
          </div>
        )}
        {/* //////////////// add MORE dayl normal */}
        {true && (
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
              onClick={() => setisModalMoreDaylOpen(() => true)}
            >
              Add More $DAYL
            </button>
          </div>
        )}
        {/* //////////////// CLAIM */}
        {true && (
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
                  40,000 $DAYL
                </div>
              </div>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">
                  Time to Unlock
                </div>
                <div className="hero-sale-section-connected-a">20 days</div>
              </div>
            </div>
            {/* //HERO BUTTON FOR CLAIM  */}
            <button
              className="hero-sale-section-button"
              disabled
              onClick={() => setisModalOpen(() => true)}
            >
              Claim
            </button>
          </div>
        )}
        {/* //////////////// WITHDRAW */}
        {true && (
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
                  className={`hero-sale-section-connected-a ${
                    false ? "connected-success" : "connected-failed"
                  }`}
                >
                  FAILED
                </div>
              </div>
              <div
                className="hero-sale-section-price"
                style={{ alignItems: "flex-start", gap: "16px" }}
              >
                <div className="hero-sale-section-connected-b">
                  Withdrawable
                </div>
                <div className="hero-sale-section-connected-a">$1,000 USDC</div>
              </div>
            </div>
            {/* //HERO BUTTON FOR CLAIM  */}
            <button
              className="hero-sale-section-button"
              onClick={() => setisModalOpen(() => true)}
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
