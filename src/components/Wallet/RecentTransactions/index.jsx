import React from "react";
import "./style.css";
import Icon from "../../Icon";
import ArrowLeftIcon from "../../../assets/img/icons/arrowLeft.svg";
import frameIcon from "../../../assets/img/icons/frame.svg";
import warningIcon from "../../../assets/img/icons/warning.svg";

import { shortenAddress, formatDate } from "../../../utils/utils";

//temp array for recent transactions
const recentTransactions = [
  {
    date: "2020-01-01",
    txHash: "0x1234567890123456789012345678901234567890",
  },
  {
    date: "2020-11-01",
    txHash: "0x1234567890123456789012345678901234567891",
  },
  {
    date: "2020-12-01",
    txHash: "0x1234567890123456789012345678901234567892",
  },
  {
    date: "2021-12-01",
    txHash: "0x123434343434343783287432003240234567892",
  },
  {
    date: "2022-12-01",
    txHash: "0x1234343434343437832874320045240234567892",
  },
  {
    date: "2020-06-11",
    txHash: "0x2234343434343437832874320032402345435892",
  },
];

const RecentTransactions = ({ wallet, onClose, disconnectWallet }) => {
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
      {recentTransactions.length > 0 ? (
        <div className="recenttransaction--wallet-info aic">
          <div className="recenttransaction--wallet-info-title">
            Your Recent Transactions
          </div>
          <div className="recenttransaction--tx-outer">
            <div className="recenttransaction--tx-inner aic">
              {recentTransactions.map((item) => {
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
                        Date: {formatDate(item.date)}
                      </div>
                      <div className="recenttransaction--box-address">
                        {shortenAddress(item.txHash)}
                      </div>
                    </div>
                    <div
                      className="recenttransaction--scan aic "
                      onClick={() => {
                        window.open(
                          `https://avascan.info/blockchain/c/tx/${item.txHash}`
                        );
                      }}
                    >
                      View on AvaScan
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
