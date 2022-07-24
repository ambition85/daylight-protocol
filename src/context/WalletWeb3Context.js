/* eslint-disable */
import React, { createContext, useEffect, useCallback, useState } from "react";
import Web3Modal from "web3modal";
// import { InjectedConnector } from '@web3-react/injected-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'

import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { mainnetNetwork as chainConfig } from "../utils/constants"
// import { useDispatch } from "react-redux";
// //
// const injected = new InjectedConnector({ supportedChainIds: [43114] })

// const walletconnect = new WalletConnectConnector({
//   rpc: { 43114: "https://api.avax.network/ext/bc/C/rpc" },
//   qrcode: true,
//   // pollingInterval: POLLING_INTERVAL,
// })

// console.log(walletconnect, injected)

// export const useAuth = () => {
//   const { activate, deactivate } = useWeb3React()
//   const login = () => {
//     console.log("Login")
//     activate(walletconnect)
//   }
//   return { login }
// }

// const POLLING_INTERVAL = 12000
// export const getLibrary = (provider) => {
//   // const biconomy = new Biconomy(provider, { apiKey: BICONOMY_API_KEY[chainId], debug: true })
//   // const ethersProvider = new ethers.providers.Web3Provider(biconomy)
//   // return ethersProvider
//   const library = new ethers.providers.Web3Provider(provider)
//   library.pollingInterval = POLLING_INTERVAL
//   return library
// }

export const WalletWeb3Context = createContext();
export const WalletWeb3Provider = ({ children }) => {
  // const dispatch = useDispatch();
  const [web3Modal, setWeb3Modal] = useState(null);
  const [provider, setprovider] = useState(null);
  const [wallet, setwallet] = useState(null);
  const [library, setlibrary] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isWrongNetwork, setisWrongNetwork] = useState(false);
  useEffect(() => {
    const newWeb3Modal = new Web3Modal({
      cacheProvider: false,
      theme: "dark",
      providerOptions: {
        injected: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              43114: "https://api.avax.network/ext/bc/C/rpc",
              name: "avalanche"
              // 43113: "https://api.avax-test.network/ext/bc/C/rpc",
            },
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              43114: "https://api.avax.network/ext/bc/C/rpc",
              name: "avalanche"
              // 43113: "https://api.avax-test.network/ext/bc/C/rpc",
            },
            chainId: 43114,
            name: "avalanche"
          },
        },
      },
    });
    setWeb3Modal(newWeb3Modal);
  }, []);
  ///connect wallet
  const connectWallet = async () => {
    try {
      web3Modal.clearCachedProvider();
      console.log("Web3 modal", web3Modal)
      const providerWeb3 = await web3Modal.connect()
      console.log("Web3 provider", providerWeb3)
      setprovider(providerWeb3);
      //
      const libraryWeb3 = new ethers.providers.Web3Provider(providerWeb3);
      console.log("Web3 libraryWeb3", libraryWeb3)
      const librarySigner = libraryWeb3.getSigner();
      setSigner(librarySigner)
      const library = new ethers.providers.Web3Provider(providerWeb3);
      setlibrary(library)
      console.log("Prov: ", providerWeb3, library, librarySigner)
      const accountsWeb3 = await libraryWeb3.listAccounts();
      const network = await libraryWeb3.getNetwork();
      let currentNetwork =
        process.env.REACT_APP_NETWORK_ENV === "mainnet"
          ? process.env.REACT_APP_MAINNET_CHAINID
          : process.env.REACT_APP_TESTNET_CHAINID;
      if (network.chainId !== parseInt(currentNetwork)) {
        setisWrongNetwork(true);
        await updateNetworkWallet()
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
    console.log("Update:", process.env.REACT_APP_NETWORK_ENV)
    const library = new ethers.providers.Web3Provider(provider);
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainConfig.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [chainConfig],
          });
        } catch (err) {
          console.log("error adding chain:", err);
        }
      }
    }
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
        signer,
        library,
        isWrongNetwork,
        updateNetworkWallet,
      }}
    >
      {children}
    </WalletWeb3Context.Provider>
  );
};
