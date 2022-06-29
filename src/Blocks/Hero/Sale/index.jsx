import React from "react";
import "./style.css";
import logoToken from "../../../assets/img/brand/logoToken.svg";

const Sale = () => {
  return (
    <div className="hero-sale-container-outer">
      <div className="hero-sale-container">
        {/* //////////////// 1 */}
        <div className="hero-sale-section">
          <div className="hero-sale-section-brand">
            <div className="hero-sale-section-brand-logo">
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
                DLP
              </div>
            </div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">Price</div>
            <div className="hero-sale-section-price-amount">$0.1</div>
            <div className="hero-sale-section-price-estimated">
              0.00023 AVAX
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
            <div className="hero-sale-section-price-amount">SALE ENDED.</div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">Time left</div>
            <div className="hero-sale-section-price-amount">SALE ENDED.</div>
          </div>
        </div>
        {/* //////////////// 3 */}
        <div className="hero-sale-section" style={{ marginTop: "8px" }}>
          <div className="hero-sale-section-nametags">Sale</div>
          <div className="hero-sale-section-nametags">Airdrop</div>
        </div>

        {/* //////////////// 3 */}
        <div className="hero-sale-bar">
          <div className="hero-sale-bar-circle" />
        </div>
        <div className="hero-sale-bar-value">0,0</div>
        {/* //////////////// 4 */}
        <div className="hero-sale-section" style={{ marginTop: "27.32px" }}>
          <div
            className="hero-sale-section-price"
            style={{ alignItems: "flex-start" }}
          >
            <div className="hero-sale-section-price-title">
              Token Distribution
            </div>
            <div className="hero-sale-section-price-amount">85,714300</div>
          </div>
          <div className="hero-sale-section-price">
            <div className="hero-sale-section-price-title">Total Raised</div>
            <div className="hero-sale-section-price-amount">
              $0.0 / 1,500,000
            </div>
          </div>
        </div>
        {/* //////////////// 5 */}
        <div className="hero-sale-section" style={{ marginTop: "27.32px" }}>
          Want to automate the Sale?
          <div className="hero-sale-section-button">View my Automations</div>
        </div>
      </div>
      {/* //////////// */}
      <div className="hero-sale-process-container">
        <div className="hero-sale-process">
          <div className="hero-sale-process-option">
            <div className="hero-sale-process-option-icon">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4026 1.39657C17.0188 1.01301 16.4984 0.797546 15.9558 0.797546C15.4132 0.797546 14.8927 1.01301 14.5089 1.39657L6.54791 9.35657L3.65322 6.46188C3.26936 6.07802 2.74874 5.86237 2.20588 5.86237C1.66302 5.86237 1.1424 6.07802 0.758537 6.46188C0.374678 6.84574 0.159027 7.36637 0.159027 7.90923C0.159027 8.45209 0.374678 8.97271 0.758537 9.35657L5.10082 13.6983C5.48459 14.0816 6.00478 14.2969 6.54714 14.2969C7.0895 14.2969 7.60969 14.0816 7.99346 13.6983L17.4046 4.29074C17.7879 3.90697 18.0032 3.38678 18.0032 2.84442C18.0032 2.30206 17.7879 1.78187 17.4046 1.3981L17.4026 1.39657Z"
                  fill="url(#paint0_linear_43_394)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_43_394"
                    x1="0.159027"
                    y1="7.54722"
                    x2="18.0032"
                    y2="7.54722"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#DA4A52" />
                    <stop offset="1" stop-color="#DF775A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="hero-sale-process-option-text">Autobuy Enabled</div>
          </div>
          <div className="hero-sale-process-divider" />
          <div className="hero-sale-process-option">
            <div className="hero-sale-process-option-icon">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4026 1.39657C17.0188 1.01301 16.4984 0.797546 15.9558 0.797546C15.4132 0.797546 14.8927 1.01301 14.5089 1.39657L6.54791 9.35657L3.65322 6.46188C3.26936 6.07802 2.74874 5.86237 2.20588 5.86237C1.66302 5.86237 1.1424 6.07802 0.758537 6.46188C0.374678 6.84574 0.159027 7.36637 0.159027 7.90923C0.159027 8.45209 0.374678 8.97271 0.758537 9.35657L5.10082 13.6983C5.48459 14.0816 6.00478 14.2969 6.54714 14.2969C7.0895 14.2969 7.60969 14.0816 7.99346 13.6983L17.4046 4.29074C17.7879 3.90697 18.0032 3.38678 18.0032 2.84442C18.0032 2.30206 17.7879 1.78187 17.4046 1.3981L17.4026 1.39657Z"
                  fill="url(#paint0_linear_43_394)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_43_394"
                    x1="0.159027"
                    y1="7.54722"
                    x2="18.0032"
                    y2="7.54722"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#DA4A52" />
                    <stop offset="1" stop-color="#DF775A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="hero-sale-process-option-text">
              Autobuy Executed
            </div>
          </div>
        </div>
        <div className="hero-sale-process">
          <div className="hero-sale-process-option">
            <div className="hero-sale-process-option-icon">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4026 1.39657C17.0188 1.01301 16.4984 0.797546 15.9558 0.797546C15.4132 0.797546 14.8927 1.01301 14.5089 1.39657L6.54791 9.35657L3.65322 6.46188C3.26936 6.07802 2.74874 5.86237 2.20588 5.86237C1.66302 5.86237 1.1424 6.07802 0.758537 6.46188C0.374678 6.84574 0.159027 7.36637 0.159027 7.90923C0.159027 8.45209 0.374678 8.97271 0.758537 9.35657L5.10082 13.6983C5.48459 14.0816 6.00478 14.2969 6.54714 14.2969C7.0895 14.2969 7.60969 14.0816 7.99346 13.6983L17.4046 4.29074C17.7879 3.90697 18.0032 3.38678 18.0032 2.84442C18.0032 2.30206 17.7879 1.78187 17.4046 1.3981L17.4026 1.39657Z"
                  fill="url(#paint0_linear_43_394)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_43_394"
                    x1="0.159027"
                    y1="7.54722"
                    x2="18.0032"
                    y2="7.54722"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#DA4A52" />
                    <stop offset="1" stop-color="#DF775A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="hero-sale-process-option-text">
              Buy Reminder Enabled
            </div>
          </div>
          <div className="hero-sale-process-divider" />
          <div className="hero-sale-process-option">
            <div className="hero-sale-process-option-icon">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4026 1.39657C17.0188 1.01301 16.4984 0.797546 15.9558 0.797546C15.4132 0.797546 14.8927 1.01301 14.5089 1.39657L6.54791 9.35657L3.65322 6.46188C3.26936 6.07802 2.74874 5.86237 2.20588 5.86237C1.66302 5.86237 1.1424 6.07802 0.758537 6.46188C0.374678 6.84574 0.159027 7.36637 0.159027 7.90923C0.159027 8.45209 0.374678 8.97271 0.758537 9.35657L5.10082 13.6983C5.48459 14.0816 6.00478 14.2969 6.54714 14.2969C7.0895 14.2969 7.60969 14.0816 7.99346 13.6983L17.4046 4.29074C17.7879 3.90697 18.0032 3.38678 18.0032 2.84442C18.0032 2.30206 17.7879 1.78187 17.4046 1.3981L17.4026 1.39657Z"
                  fill="url(#paint0_linear_43_394)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_43_394"
                    x1="0.159027"
                    y1="7.54722"
                    x2="18.0032"
                    y2="7.54722"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#DA4A52" />
                    <stop offset="1" stop-color="#DF775A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="hero-sale-process-option-text">
              Buy Reminder Executed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
