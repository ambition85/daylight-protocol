export const tokenddress =
  process.env.REACT_APP_NETWORK_ENV === "mainnet" ? "" : "";
/////////////////////////////////////////////////////////////////////////////////////// //////////
export const mainnetNetwork = {
  chainId: `0x${Number(56).toString(16)}`,
  chainName: "Binance Smart Chain Mainnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: [
    "https://bsc-dataseed.binance.org",
  ],
  blockExplorerUrls: ["https://bscscan.com"],
};
export const testnetNetwork = {
  chainId: `0x${Number(97).toString(16)}`,
  chainName: "Binance Smart Chain Testnet",
  nativeCurrency: {
    name: "Binance Smart Chain Testnet",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: [
    "https://data-seed-prebsc-2-s3.binance.org:8545/",
  ],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};
