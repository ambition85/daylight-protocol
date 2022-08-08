export const shortenAddress = (address) => {
  if (!address) return "...";
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
export const shortenAddressLong = (address) => {
  if (!address) return "...";
  return `${address.slice(0, 10)}...${address.slice(address.length - 9)}`;
};
export const localeString = (number) => {
  if (!number) return "...";
  return parseFloat(number).toLocaleString();
};
export const stringToSHA256 = async (string) => {
  if (!string) return "...";
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.toUpperCase();
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    // weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export function saveTxHistory(txHash) {
  let txs = [];
  const history = localStorage.getItem("txHistory");
  if (history) txs = JSON.parse(history);

  txs.push({
    createAt: Number(new Date()),
    hash: txHash,
  });

  localStorage.setItem("txHistory", JSON.stringify(txs));
}

export function getTxHistory() {
  let txs = [];
  const history = localStorage.getItem("txHistory");
  if (history) txs = JSON.parse(history);

  return txs;
}
export const formatNumbers = (value) => {
  const suffixes = ["", "K", "M", "B", "T", "P", "E"];
  const suffixNum = Math.floor(("" + value).length / 3);
  let shortValue = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }

  return shortValue + suffixes[suffixNum];
};
export const formatNumbers2 = (value) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};
