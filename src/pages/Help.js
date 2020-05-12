import React from "react";
// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paragraph: {
    margin: "10px 0",
  },
}));
const Help = (props) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      style={{
        height: "100vh",
        borderRadius: 0,
      }}
    >
      <div
        style={{
          maxWidth: 425,
          margin: "auto",
          textAlign: "center",
          padding: 25,
          paddingTop: 50,
        }}
      >
        <Typography variant="body1" className={classes.paragraph}>
          Need help? Don’t hesitate to reach out!
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Send an email to team@hayek.ai and we’ll get back to you in less than
          12 hours.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Or give the founders a call at (732) 977-3873 or (732) 887-7499{" "}
        </Typography>
      </div>
    </Paper>
  );
};

export default Help;
