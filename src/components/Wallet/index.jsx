import React, { useState, useContext } from "react";
import Modal from "../Modal";
import Profile from "./Profile";
import RecentTransactions from "./RecentTransactions";
import "./style.css";
import { WalletWeb3Context } from "../..//context/WalletWeb3Context";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useAuth from "../../hooks/useAuth";

const WalletMenu = ({ isWalletOptionsOpen, setisWalletOptionsOpen }) => {
  //state for openning profile menu
  const [isOpenWallet, setisOpenWallet] = useState(false);
  const [isOpenTransactions, setisOpenTransactions] = useState(false);
  const { account: wallet } = useActiveWeb3React()
  const { logout: disconnectWallet } = useAuth()

  return (
    <>
      <Modal visible={isOpenWallet} onClose={() => setisOpenWallet(false)}>
        <Profile
          wallet={wallet}
          onClose={() => setisOpenWallet(false)}
          disconnectWallet={disconnectWallet}
        />
      </Modal>
      <Modal
        visible={isOpenTransactions}
        onClose={() => setisOpenTransactions(false)}
      >
        <RecentTransactions
          wallet={wallet}
          onClose={() => setisOpenTransactions(false)}
          disconnectWallet={disconnectWallet}
        />
      </Modal>

      {!!wallet && (
        <div
          onClick={() => setisWalletOptionsOpen(false)}
          className={
            isWalletOptionsOpen
              ? "walletmenu-outer--open aic"
              : "walletmenu-outer--close aic"
          }
        >
          <div
            className={
              isWalletOptionsOpen ? "walletmenu--open" : "walletmenu--close"
            }
          >
            <div
              className="walletmenu--option"
              onClick={() => {
                setisOpenWallet(true);
                setisWalletOptionsOpen(false);
              }}
            >
              Wallet
            </div>
            <div
              className="walletmenu--option"
              onClick={() => {
                setisOpenTransactions(true);
                setisWalletOptionsOpen(false);
              }}
            >
              Recent Transactions
            </div>
            <div className="walletmenu--divider" />
            <div className="walletmenu--option">
              <div className="walletmenu--option" onClick={disconnectWallet}>
                Disconnect
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletMenu;
