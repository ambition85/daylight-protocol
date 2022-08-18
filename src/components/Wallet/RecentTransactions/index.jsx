import React, { useState } from "react";
import "./style.css";
import Icon from "../../Icon";
import ArrowLeftIcon from "../../../assets/img/icons/arrowLeft.svg";
import frameIcon from "../../../assets/img/icons/frame.svg";
import warningIcon from "../../../assets/img/icons/warning.svg";

import { shortenAddress, formatDate, getTxHistory } from "../../../utils/utils";

const RecentTransactions = ({ wallet, onClose, disconnectWallet }) => {
  const [recentTx, setRecentTx] = useState([])

  useState(() => {
    const txs = getTxHistory()
    setRecentTx(txs)
  }, [])

  const disconnectHandler = () => {
    disconnectWallet();
    onClose();
  };
  return (
    <div
      className="recenttransaction-container"
      data-aos="fade-down"
      data-aos-delay="200"
      data-aos-offset="-100"
      data-aos-easing="ease-in-out"
    >
      <div className="recenttransaction--header aic">
        <div onClick={() => onClose()}>
          <Icon
            imgsrc={ArrowLeftIcon}
            classnamestyle="hover-effect recenttransaction--header-back aic"
          />
        </div>
        Your Transactions
      </div>

      {/* /////////// */}
      {recentTx.length > 0 ? (
        <div className="recenttransaction--wallet-info aic">
          <div className="recenttransaction--wallet-info-title">
            Your Recent Transactions
          </div>
          <div className="recenttransaction--tx-outer">
            <div className="recenttransaction--tx-inner aic">
              {recentTx.map((item) => {
                return (
                  <div
                    key={item.txHash}
                    className="recenttransaction--box aic tx-box"
                    style={{
                      padding: "9px 16px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="recenttransaction--box-tx aic">
                      <div className="recenttransaction--box-date">
                        Date: {formatDate(item.createAt)}
                      </div>
                      <div className="recenttransaction--box-address">
                        {shortenAddress(item.hash)}
                      </div>
                    </div>
                    <div
                      className="recenttransaction--scan aic "
                      onClick={() => {
                        window.open(
                          `https://bscscan.com/tx/${item.hash}`
                        );
                      }}
                    >
                      View on BSCScan
                      <Icon
                        imgsrc={frameIcon}
                        classnamestyle="recenttransaction--box-warning-icon aic"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="recenttransaction--box aic"
          style={{
            gap: "8px",
            margin: "16px 0px",
            padding: "10px 6px",
            border: "1px solid #DA4A52",
          }}
        >
          <Icon
            imgsrc={warningIcon}
            classnamestyle="recenttransaction--box-warning-icon aic hover-effect"
          />
          <div
            className=" recenttransaction--box-warning-bottom"
            style={{
              width: "200px",
            }}
          >
            There are no Transactions
          </div>
        </div>
      )}

      {/* /////////// */}

      <button
        className="recenttransaction--button aic"
        type="button"
        onClick={() => disconnectHandler()}
      >
        Disconnect Wallet
      </button>
    </div>
  );
};

export default RecentTransactions;
