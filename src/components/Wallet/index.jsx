import React, { useState, useContext } from "react";
import Modal from "../Modal";
import Profile from "./Profile";
import "./style.css";
import { WalletWeb3Context } from "../..//context/WalletWeb3Context";

const WalletMenu = ({ isWalletOptionsOpen, setisWalletOptionsOpen }) => {
  //state for openning profile menu
  const [isOpenWallet, setisOpenWallet] = useState(false);
  const [isOpenTransactions, setisOpenTransactions] = useState(false);
  const { wallet, disconnectWallet } = useContext(WalletWeb3Context);

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
      ></Modal>

      {!!wallet && (
        <div
          className={
            isWalletOptionsOpen ? "walletmenu--open" : "walletmenu--close"
          }
        >
          <div
            className="walletmenu--option"
            onClick={() => setisOpenWallet(true)}
          >
            Wallet
          </div>
          <div className="walletmenu--option">Recent Transactions</div>
          <div className="walletmenu--divider" />
          <div className="walletmenu--option" onClick={disconnectWallet}>
            Disconnect
          </div>
        </div>
      )}
    </>
  );
};

export default WalletMenu;
