export const getNumberWithOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// x = number to be formatted || sigFigs is int | 'dollars' & 'percentage' are bools
export const formatNumber = (x, significantFigures, dollars, percentage) => {
  x = parseFloat(x);
  if (isNaN(x)) {
    return "n/a";
  }
  if (percentage) {
    x = x * 100;
  }
  return `${dollars ? "$" : ""}${x
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
