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
