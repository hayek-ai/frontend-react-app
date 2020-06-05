import React from "react";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";

const useStyles = makeStyles((theme) => ({
  paragraph: {
    margin: "10px 0",
  },
}));
const Help = () => {
  const classes = useStyles();

  return (
    <FullPageLayout containerType="wideContainer" paperBackground={true}>
      <Typography variant="body1" className={classes.paragraph}>
        Need help? Don’t hesitate to reach out!
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Send an email to team@hayek.ai and we’ll get back to you in less than 12
        hours.
      </Typography>
    </FullPageLayout>
  );
};

export default Help;
