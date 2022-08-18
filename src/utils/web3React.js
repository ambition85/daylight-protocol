import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ethers } from 'ethers'
import { mainnetNetwork as chainConfig } from './constants'

const POLLING_INTERVAL = 12000
// export const rpcUrl = "https://api.avax.network/ext/bc/C/rpc"
export const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
// const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
export const chainId = 56
const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  chainId,
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL,
})

export const connectorsByName = {
  injected: injected,
  walletconnect: walletconnect,
}

export const getLibrary = (provider) => {
  // const biconomy = new Biconomy(provider, { apiKey: BICONOMY_API_KEY[chainId], debug: true })
  // const ethersProvider = new ethers.providers.Web3Provider(biconomy)
  // return ethersProvider
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

export const updateNetwork = async (library) => {
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
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
}
/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (provider, account, message) => {
  if (window.BinanceChain) {
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}

export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_MAINNET_CHAINID, 10)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'AVAX',
              symbol: 'avax',
              decimals: 18,
            },
            rpcUrls: [rpcUrl],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Binance Smart Chain network on metamask because window.ethereum is undefined")
    return false
  }
}
