export const shortenAddress = (address: string | undefined) => {
  if (address === undefined) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmountWithUnit = (amount: number, displayDecimals = 2) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return amount >= item.value;
    });

  if (amount > 1000 * (item?.value as number)) {
    let i = 21;
    for (; ; i++) {
      if (amount < Math.pow(10, i + 1)) {
        break;
      }
    }

    return `${(amount / Math.pow(10, i)).toFixed(displayDecimals)}*1e${i}`;
  }

  return item ? (amount / item.value).toFixed(displayDecimals).replace(rx, "$1") + item.symbol : "0";
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function isPageActive(path: string, match: string) {
  if (path && match) {
    if (path === match) {
      return true;
    }
    return false;
  }
  return false;
}
