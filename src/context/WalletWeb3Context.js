/* eslint-disable */
import React, { createContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { mainnetNetwork, testnetNetwork } from "../utils/constants";
// import { useDispatch } from "react-redux";
//
export const WalletWeb3Context = createContext();
export const WalletWeb3Provider = ({ children }) => {
  // const dispatch = useDispatch();
  const [web3Modal, setWeb3Modal] = useState(null);
  const [provider, setprovider] = useState(null);
  const [wallet, setwallet] = useState(null);
  const [isWrongNetwork, setisWrongNetwork] = useState(false);
  useEffect(() => {
    const newWeb3Modal = new Web3Modal({
      network: "avalanche",
      cacheProvider: true,

      theme: "dark",
      providerOptions: {
        injected: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              43114: "https://api.avax.network/ext/bc/C/rpc",
              43113: "https://api.avax-test.network/ext/bc/C/rpc",
            },
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              43114: "https://api.avax.network/ext/bc/C/rpc",
              43113: "https://api.avax-test.network/ext/bc/C/rpc",
            },
          },
        },
      },
    });
    setWeb3Modal(newWeb3Modal);
  }, []);
  ///connect wallet
  const connectWallet = async () => {
    try {
      const providerWeb3 = await web3Modal.connect();
      setprovider(providerWeb3);
      //
      const libraryWeb3 = new ethers.providers.Web3Provider(providerWeb3);
      // const librarySigner = libraryWeb3.getSigner();
      const accountsWeb3 = await libraryWeb3.listAccounts();
      const network = await libraryWeb3.getNetwork();
      let currentNetwork =
        process.env.REACT_APP_NETWORK_ENV === "mainnet"
          ? process.env.REACT_APP_MAINNET_CHAINID
          : process.env.REACT_APP_TESTNET_CHAINID;
      if (network.chainId !== parseInt(currentNetwork)) {
        setisWrongNetwork(true);
      }
      let walletAddress;
      if (accountsWeb3) {
        walletAddress = accountsWeb3[0];
      }
      setwallet(walletAddress);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    }
  };
  //disconnect wallet
  const disconnectWallet = () => {
    resetState();
    web3Modal.clearCachedProvider();
  };
  //update network
  const updateNetworkWallet = async () => {
    const library = new ethers.providers.Web3Provider(provider);
    await library.provider.request({
      method: "wallet_addEthereumChain",
      params: [
        process.env.REACT_APP_NETWORK_ENV === "mainnet"
          ? mainnetNetwork
          : testnetNetwork,
      ],
    });
  };
  //reset network
  const resetState = async () => {
    setprovider(() => null);
    setwallet(() => null);
    setisWrongNetwork(() => false);
  };
  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) {
          if (accounts.length === 0) {
            console.log("handleAccountsChanged 0");
            disconnectWallet();
          } else {
            connectWallet();
          }
        }
      };
      const handleChainChanged = (_hexChainId) => {
        console.log("handleChainChanged", _hexChainId);
        disconnectWallet();
      };
      const handleDisconnect = () => {
        console.log("handleDisconnect");
        disconnectWallet();
      };
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <WalletWeb3Context.Provider
      value={{
        connectWallet,
        disconnectWallet,
        wallet,
        isWrongNetwork,
        updateNetworkWallet,
      }}
    >
      {children}
    </WalletWeb3Context.Provider>
  );
};
