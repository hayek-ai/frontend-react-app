export const getNumberWithOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// n = number to be formatted || sigFigs is int | 'dollars' & 'percentage' are bools
export const formatNumber = (n, significantFigures, dollars, percentage) => {
  n = parseFloat(n);
  if (isNaN(n)) {
    return "n/a";
  }
  if (percentage) {
    n = n * 100;
  }
  return `${dollars ? "$" : ""}${n
    .toFixed(significantFigures)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${percentage ? "%" : ""}`;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getBaseUrl = () => {
  const getUrl = window.location;
  const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
  return baseUrl;
};

export const abbreviateNumber = (n) => {
  n = parseFloat(n);
  if (isNaN(n)) {
    return "n/a";
  }
  const isNegative = n < 0;
  n = Math.abs(n);
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) {
    n = (n / 1e3).toFixed(1) + "K";
  }
  if (n >= 1e6 && n < 1e9) {
    n = (n / 1e6).toFixed(1) + "M";
  }
  if (n >= 1e9 && n < 1e12) {
    n = (n / 1e9).toFixed(1) + "B";
  }
  if (n >= 1e12) {
    n = (n / 1e12).toFixed(1) + "T";
  }
  return `${isNegative ? "-" : ""}${n}`;
};
