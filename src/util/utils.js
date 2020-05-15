export const getNumberWithOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// n = number to be formatted || sigFigs is int | type = 'dollars', 'percentage', or 'ratio'
export const formatNumber = (n, sigFigs, type) => {
  n = parseFloat(n);
  if (isNaN(n)) {
    return "n/a";
  }
  if (type === "percentage") {
    n = n * 100;
  }
  const isNegative = n < 0;
  n = Math.abs(n);
  return `${isNegative ? "-" : ""}${type === "dollars" ? "$" : ""}${n
    .toFixed(sigFigs)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${type === "percentage" ? "%" : ""}${
    type === "ratio" ? "x" : ""
  }`;
};

export const capitalizeFirstLetter = (string) => {
  if (string === undefined) {
    return "";
  }
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

export const LightenDarkenColor = (col, amt) => {
  var usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

export const convertUTCDateToLocalDate = (date) => {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};
