export const tokenddress =
  process.env.REACT_APP_NETWORK_ENV === "mainnet" ? "" : "";
/////////////////////////////////////////////////////////////////////////////////////// //////////
export const mainnetNetwork = {
  chainId: `0x${Number(43114).toString(16)}`,
  chainName: "Avalanche C-chain",
  nativeCurrency: {
    name: "Avalanche C-chain",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc",
    "https://rpc.ankr.com/avalanche",
  ],
  blockExplorerUrls: ["https://snowtrace.io"],
};
export const testnetNetwork = {
  chainId: `0x${Number(43113).toString(16)}`,
  chainName: "Avalanche Fuji Testnet",
  nativeCurrency: {
    name: "Avalanche Fuji Testnet",
    symbol: "tAVAX",
    decimals: 18,
  },
  rpcUrls: [
    "https://api.avax-test.network/ext/bc/C/rpc",
    "https://rpc.ankr.com/avalanche_fuji",
  ],
  blockExplorerUrls: ["https://testnet.snowtrace.io"],
};
