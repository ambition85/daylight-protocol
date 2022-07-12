import React, { useState } from "react";
import "./style.css";
import logoToken from "../../../assets/img/brand/logoToken.svg";
import { localeString } from "../../../utils/utils";
import Modal from "../../../components/Modal";
import AddDaylModal from "./AddDaylModal";

const Sale = ({ progress, total }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState("30px");
  React.useEffect(() => {
    setProgressPercent((progress / total) * 100 + "%");
  }, [progress]);

  return (
    <div className="hero-sale-container-outer">
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
          <div className="hero-sale-section-nametags">Airdrop</div>
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
        {/* //////////////// 5 */}
        <div
          className="hero-sale-section"
          style={{ marginTop: "27.32px", justifyContent: "flex-end" }}
        >
          <Modal visible={isModalOpen} onClose={() => setisModalOpen(false)}>
            <AddDaylModal onClose={() => setisModalOpen(false)} />
          </Modal>
          <div
            className="hero-sale-section-button"
            onClick={() => setisModalOpen(() => true)}
          >
            Add $DAYL
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
