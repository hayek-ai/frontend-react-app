import React from "react";
import Logo from "../assets/logo.svg";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 75,
    objectFit: "cover",
    margin: 10,
  },
}));
const LandingPage = (props) => {
  const classes = useStyles();
  const handleSignup = () => {
    // should probably log this data to help measure conversion/click-through
    props.history.push("/signup");
  };

  const handleLogin = () => {
    props.history.push("/login");
  };

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
        <img src={Logo} alt="logo" className={classes.logo} />
        <Typography variant="h5" color="primary" align="center">
          Welcome to hayek.ai
        </Typography>
        <Typography variant="body1" align="center">
          The best place on the Internet for investment ideas.
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            style={{ width: "90%", margin: 10 }}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogin}
            style={{ width: "90%", margin: 10 }}
          >
            Login
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default LandingPage;
