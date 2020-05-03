import { createMuiTheme } from "@material-ui/core/styles";

export const primary = "#0288D1";
export const primaryLight = "#349fda";
export const primaryDark = "#015f92";

export const lightPrimaryText = "#000000";
export const lightSecondaryText = "697387";
export const lightBackground = "#f4f6fa";
export const lightPaper = "#fff";

export const darkPrimaryText = "#fff";
export const darkSecondaryText = "#C1C1C1";
export const darkBackground = "#303030";
export const darkPaper = "#424242";

// dark is a boolean
export const theme = (dark) =>
  createMuiTheme({
    palette: {
      type: `${dark ? "dark" : "light"}`,
      primary: {
        light: `${primaryLight}`,
        main: `${primary}`,
        dark: `${primaryDark}`,
      },
    },
    text: {
      primary: `${dark ? darkPrimaryText : lightPrimaryText}`,
      secondary: `${dark ? darkSecondaryText : lightSecondaryText}`,
    },
    background: {
      default: `${dark ? darkBackground : lightBackground}`,
      paper: `${dark ? darkPaper : lightPaper}`,
    },
    typograph: {
      fontFamily: "'Muli', sans-serif",
    },
  });
